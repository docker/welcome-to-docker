"""
Orchestrator — The Autonomous Legal War Game

Drives the full adversarial pipeline:
  1. Ingest document segments.
  2. Route each segment to the Plaintiff Agent (Red Team) for attack.
  3. Route the original text + attack report to the Defense Agent (Blue Team).
  4. Collect SegmentReports for the final output.

Supports:
  - Sequential processing (safe, predictable, lower concurrency cost).
  - Parallel processing (faster for large documents; uses concurrent API calls).
"""

from __future__ import annotations

import asyncio
import concurrent.futures
from typing import Callable, List, Optional

import anthropic
from rich.console import Console
from rich.progress import (
    BarColumn,
    MofNCompleteColumn,
    Progress,
    SpinnerColumn,
    TextColumn,
    TimeElapsedColumn,
)
from rich.table import Table

from .agents import plaintiff, defense
from .document.processor import DocumentSegment, load_and_segment
from .models.schemas import SegmentReport

console = Console()


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def run_simulation(
    document_path: str,
    words_per_segment: int = 800,
    parallel: bool = False,
    max_workers: int = 3,
    on_segment_complete: Optional[Callable[[SegmentReport], None]] = None,
) -> List[SegmentReport]:
    """
    Run the full Legal War Game simulation on a document.

    Args:
        document_path:       Path to a .pdf or .txt file.
        words_per_segment:   Soft word-count cap per segment (default 800).
        parallel:            If True, process segments concurrently.
        max_workers:         Max parallel threads when parallel=True.
        on_segment_complete: Optional callback invoked after each segment.

    Returns:
        List of SegmentReport, one per document segment.
    """
    client = anthropic.Anthropic()

    console.rule("[bold cyan]AUTONOMOUS LEGAL WAR GAME — SIMULATION ALPHA[/bold cyan]")
    console.print(f"\n[bold]Document:[/bold] {document_path}")

    # ── 1. Ingest ──────────────────────────────────────────────────────────
    with console.status("[yellow]Ingesting and segmenting document…"):
        segments = load_and_segment(document_path, words_per_segment)

    console.print(
        f"[green]✓[/green] Segmented into [bold]{len(segments)}[/bold] clause blocks "
        f"(~{words_per_segment} words each)\n"
    )

    _print_segment_table(segments)

    # ── 2. Run adversarial pipeline ────────────────────────────────────────
    reports: List[SegmentReport] = []

    if parallel and len(segments) > 1:
        reports = _run_parallel(client, segments, max_workers, on_segment_complete)
    else:
        reports = _run_sequential(client, segments, on_segment_complete)

    return reports


# ---------------------------------------------------------------------------
# Sequential execution
# ---------------------------------------------------------------------------

def _run_sequential(
    client: anthropic.Anthropic,
    segments: List[DocumentSegment],
    on_complete: Optional[Callable[[SegmentReport], None]],
) -> List[SegmentReport]:
    reports: List[SegmentReport] = []

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        MofNCompleteColumn(),
        TimeElapsedColumn(),
        console=console,
    ) as progress:
        task = progress.add_task("Processing segments…", total=len(segments))

        for seg in segments:
            progress.update(task, description=f"[cyan]{seg.segment_id}[/cyan] — Red Team attacking…")
            report = _process_segment(client, seg)
            reports.append(report)
            if on_complete:
                on_complete(report)
            progress.advance(task)

    return reports


# ---------------------------------------------------------------------------
# Parallel execution
# ---------------------------------------------------------------------------

def _run_parallel(
    client: anthropic.Anthropic,
    segments: List[DocumentSegment],
    max_workers: int,
    on_complete: Optional[Callable[[SegmentReport], None]],
) -> List[SegmentReport]:
    """
    Process segments in parallel using a thread pool.
    The Anthropic SDK is thread-safe; each call creates its own HTTP session.
    """
    console.print(
        f"[bold yellow]Parallel mode:[/bold yellow] up to {max_workers} concurrent API calls.\n"
    )

    results: dict[str, SegmentReport] = {}

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        MofNCompleteColumn(),
        TimeElapsedColumn(),
        console=console,
    ) as progress:
        task = progress.add_task("Processing segments (parallel)…", total=len(segments))

        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_seg = {
                executor.submit(_process_segment, client, seg): seg
                for seg in segments
            }
            for future in concurrent.futures.as_completed(future_to_seg):
                seg = future_to_seg[future]
                try:
                    report = future.result()
                    results[seg.segment_id] = report
                    if on_complete:
                        on_complete(report)
                except Exception as exc:
                    console.print(
                        f"[red]ERROR[/red] {seg.segment_id}: {exc}"
                    )
                finally:
                    progress.advance(task)

    # Return in original document order
    ordered = [results[seg.segment_id] for seg in segments if seg.segment_id in results]
    return ordered


# ---------------------------------------------------------------------------
# Single-segment pipeline
# ---------------------------------------------------------------------------

def _process_segment(
    client: anthropic.Anthropic,
    seg: DocumentSegment,
) -> SegmentReport:
    """Run the full Red → Blue pipeline for a single document segment."""

    # ── Red Team attack ──────────────────────────────────────────────────
    plaintiff_analysis = plaintiff.run(
        client=client,
        clause_text=seg.text,
        segment_id=seg.segment_id,
    )

    # ── Blue Team defence ────────────────────────────────────────────────
    defense_analysis = defense.run(
        client=client,
        clause_text=seg.text,
        plaintiff_analysis=plaintiff_analysis,
        segment_id=seg.segment_id,
    )

    return SegmentReport(
        segment_id=seg.segment_id,
        original_text=seg.text,
        plaintiff_analysis=plaintiff_analysis,
        defense_analysis=defense_analysis,
    )


# ---------------------------------------------------------------------------
# Display helpers
# ---------------------------------------------------------------------------

def _print_segment_table(segments: List[DocumentSegment]) -> None:
    table = Table(title="Document Segments", show_lines=True)
    table.add_column("ID", style="cyan", no_wrap=True)
    table.add_column("Words", justify="right")
    table.add_column("Preview", max_width=80)

    for seg in segments:
        word_count = len(seg.text.split())
        preview = seg.text[:120].replace("\n", " ") + ("…" if len(seg.text) > 120 else "")
        table.add_row(seg.segment_id, str(word_count), preview)

    console.print(table)
    console.print()
