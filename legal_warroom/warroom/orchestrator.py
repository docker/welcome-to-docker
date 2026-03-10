"""
Orchestrator — entry point for the simulation.

Responsibilities:
  • Load and segment the document.
  • For each segment, run the multi-round adversarial loop.
  • Support sequential and parallel (thread-pool) processing.
  • Accept any LLMProvider(s) — Anthropic, Ollama, or mixed.
"""

from __future__ import annotations

import concurrent.futures
from typing import Callable, List, Optional

from rich.console import Console
from rich.table import Table

from .document.processor import DocumentSegment, load_and_segment
from .loop.adversarial import run_adversarial_loop
from .models.schemas import IterativeSegmentReport
from .providers.base import LLMProvider

console = Console()


def run_simulation(
    document_path: str,
    plaintiff_provider: LLMProvider,
    defense_provider: LLMProvider,
    words_per_segment: int = 800,
    max_rounds: int = 3,
    convergence_threshold: int = 2,
    parallel: bool = False,
    max_workers: int = 3,
    on_segment_complete: Optional[Callable[[IterativeSegmentReport], None]] = None,
) -> List[IterativeSegmentReport]:
    """
    Run the full Legal War Game simulation.

    Args:
        document_path:         Path to .pdf or .txt file.
        plaintiff_provider:    LLMProvider for the Red Team.
        defense_provider:      LLMProvider for the Blue Team (can be same).
        words_per_segment:     Soft word-count cap per chunk (default 800).
        max_rounds:            Max adversarial rounds per segment (default 3).
        convergence_threshold: Stop early when severity ≤ this (default 2).
        parallel:              Process segments concurrently via thread pool.
        max_workers:           Thread-pool size when parallel=True.
        on_segment_complete:   Optional callback after each segment.

    Returns:
        List[IterativeSegmentReport], one per segment, in document order.
    """
    console.rule("[bold cyan]AUTONOMOUS LEGAL WAR GAME — SIMULATION ALPHA[/bold cyan]")
    console.print(
        f"\n[bold]Document:[/bold]          {document_path}\n"
        f"[bold]Plaintiff model:[/bold]   {plaintiff_provider.model}\n"
        f"[bold]Defense model:[/bold]     {defense_provider.model}\n"
        f"[bold]Max rounds/segment:[/bold] {max_rounds}\n"
        f"[bold]Parallel:[/bold]          {parallel}\n"
    )

    # ── Segment ─────────────────────────────────────────────────────────────
    with console.status("[yellow]Ingesting and segmenting document…"):
        segments = load_and_segment(document_path, words_per_segment)

    console.print(
        f"[green]✓[/green] Segmented into [bold]{len(segments)}[/bold] clause blocks\n"
    )
    _print_segment_table(segments)

    # ── Run ─────────────────────────────────────────────────────────────────
    if parallel and len(segments) > 1:
        return _run_parallel(
            plaintiff_provider, defense_provider,
            segments, max_rounds, convergence_threshold,
            max_workers, on_segment_complete,
        )
    return _run_sequential(
        plaintiff_provider, defense_provider,
        segments, max_rounds, convergence_threshold,
        on_segment_complete,
    )


# ---------------------------------------------------------------------------
# Sequential
# ---------------------------------------------------------------------------

def _run_sequential(
    pp: LLMProvider,
    dp: LLMProvider,
    segments: List[DocumentSegment],
    max_rounds: int,
    threshold: int,
    on_complete: Optional[Callable],
) -> List[IterativeSegmentReport]:
    reports: List[IterativeSegmentReport] = []
    for i, seg in enumerate(segments, 1):
        console.rule(
            f"[cyan]Segment {i}/{len(segments)} — {seg.segment_id}[/cyan]",
            style="dim",
        )
        report = run_adversarial_loop(pp, dp, seg, max_rounds, threshold)
        reports.append(report)
        if on_complete:
            on_complete(report)
    return reports


# ---------------------------------------------------------------------------
# Parallel
# ---------------------------------------------------------------------------

def _run_parallel(
    pp: LLMProvider,
    dp: LLMProvider,
    segments: List[DocumentSegment],
    max_rounds: int,
    threshold: int,
    max_workers: int,
    on_complete: Optional[Callable],
) -> List[IterativeSegmentReport]:
    console.print(
        f"[bold yellow]Parallel mode:[/bold yellow] "
        f"up to {max_workers} concurrent segments.\n"
    )
    results: dict[str, IterativeSegmentReport] = {}

    def _process(seg: DocumentSegment) -> IterativeSegmentReport:
        return run_adversarial_loop(pp, dp, seg, max_rounds, threshold)

    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_map = {executor.submit(_process, seg): seg for seg in segments}
        for future in concurrent.futures.as_completed(future_map):
            seg = future_map[future]
            try:
                report = future.result()
                results[seg.segment_id] = report
                if on_complete:
                    on_complete(report)
            except Exception as exc:
                console.print(f"[red]ERROR[/red] {seg.segment_id}: {exc}")

    return [results[seg.segment_id] for seg in segments if seg.segment_id in results]


# ---------------------------------------------------------------------------
# Display
# ---------------------------------------------------------------------------

def _print_segment_table(segments: List[DocumentSegment]) -> None:
    table = Table(title="Document Segments", show_lines=True)
    table.add_column("ID", style="cyan", no_wrap=True)
    table.add_column("Words", justify="right")
    table.add_column("Preview", max_width=80)
    for seg in segments:
        preview = seg.text[:120].replace("\n", " ") + ("…" if len(seg.text) > 120 else "")
        table.add_row(seg.segment_id, str(len(seg.text.split())), preview)
    console.print(table)
    console.print()
