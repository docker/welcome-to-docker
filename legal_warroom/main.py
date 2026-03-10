#!/usr/bin/env python3
"""
Autonomous Legal War Game — CLI Entry Point

Usage examples:

  # Anthropic (cloud) — full simulation, 3 rounds per segment
  python main.py agreement.pdf

  # Ollama (local, free) — default model llama3.1:8b
  python main.py agreement.pdf --provider ollama

  # Ollama with a specific model + more rounds
  python main.py agreement.pdf --provider ollama --model qwen2.5:14b --rounds 4

  # Mix providers: Plaintiff on Ollama, Defense on Anthropic
  python main.py agreement.pdf \\
      --plaintiff-provider ollama --plaintiff-model qwen2.5:14b \\
      --defense-provider anthropic

  # Parallel + HTML report
  python main.py agreement.pdf --parallel --html

  # Dry run: only first 2 segments
  python main.py agreement.pdf --max-segments 2

  # Full help
  python main.py --help

Ollama setup:
  1. Install Ollama: https://ollama.com
  2. Pull a model: ollama pull qwen2.5:14b
  3. Run: python main.py agreement.pdf --provider ollama --model qwen2.5:14b

Recommended Ollama models (best → fastest):
  qwen2.5:14b   — best local quality for legal reasoning (~9GB)
  qwen2.5:7b    — good quality (~5GB)
  llama3.1:8b   — solid baseline (~5GB)
  llama3.2:3b   — fastest, lower quality (~2GB)
"""

from __future__ import annotations

from pathlib import Path
from typing import Optional

import typer
from dotenv import load_dotenv
from rich.console import Console

from warroom import orchestrator
from warroom.providers.base import make_provider
from warroom.report import generator

load_dotenv()
app = typer.Typer(add_completion=False, rich_markup_mode="rich")
console = Console()


@app.command()
def main(
    document: str = typer.Argument(
        ..., help="Path to the legal document (.pdf or .txt)"
    ),
    # ── Provider shortcuts (same provider for both agents) ─────────────────
    provider: str = typer.Option(
        "anthropic",
        "--provider", "-p",
        help="Backend for both agents: 'anthropic' (cloud) or 'ollama' (local).",
    ),
    model: Optional[str] = typer.Option(
        None,
        "--model", "-m",
        help=(
            "Model to use. Defaults: anthropic=claude-opus-4-6, ollama=llama3.1:8b. "
            "Override: --model qwen2.5:14b"
        ),
    ),
    # ── Fine-grained per-agent provider overrides ──────────────────────────
    plaintiff_provider: Optional[str] = typer.Option(
        None, "--plaintiff-provider",
        help="Provider override for the Red Team agent.",
    ),
    plaintiff_model: Optional[str] = typer.Option(
        None, "--plaintiff-model",
        help="Model override for the Red Team agent.",
    ),
    defense_provider: Optional[str] = typer.Option(
        None, "--defense-provider",
        help="Provider override for the Blue Team agent.",
    ),
    defense_model: Optional[str] = typer.Option(
        None, "--defense-model",
        help="Model override for the Blue Team agent.",
    ),
    # ── Ollama config ──────────────────────────────────────────────────────
    ollama_url: str = typer.Option(
        "http://localhost:11434/v1",
        "--ollama-url",
        help="Ollama API base URL.",
    ),
    # ── Simulation config ──────────────────────────────────────────────────
    rounds: int = typer.Option(
        3, "--rounds", "-r",
        help="Max adversarial rounds per segment (default 3).",
    ),
    convergence: int = typer.Option(
        2, "--convergence",
        help=(
            "Stop iterating when max severity drops to this level or below "
            "(after ≥2 rounds). Default 2."
        ),
    ),
    words: int = typer.Option(
        800, "--words", "-w",
        help="Soft word-count cap per segment (default 800).",
    ),
    parallel: bool = typer.Option(
        False, "--parallel",
        help="Process segments concurrently (faster, higher API concurrency).",
    ),
    workers: int = typer.Option(
        3, "--workers",
        help="Max parallel threads when --parallel is set.",
    ),
    # ── Output config ──────────────────────────────────────────────────────
    output_dir: str = typer.Option(
        "output", "--output", "-o",
        help="Directory for report files.",
    ),
    html: bool = typer.Option(
        False, "--html",
        help="Also generate a self-contained HTML report.",
    ),
    max_segments: Optional[int] = typer.Option(
        None, "--max-segments",
        help="Limit to the first N segments (useful for dry-runs).",
    ),
) -> None:
    """
    [bold cyan]Autonomous Legal War Game[/bold cyan] — M&A contract stress-testing.

    Runs a [bold red]Plaintiff Agent (Red Team)[/bold red] against a
    [bold green]Defense Agent (Blue Team)[/bold green] across multiple rounds
    per clause. Each round, the Plaintiff re-attacks the Defense's latest
    hardened rewrite until convergence or max rounds is reached.

    Supports [bold]Anthropic (cloud)[/bold] and [bold]Ollama (local, free)[/bold].
    """
    doc_path = Path(document)
    if not doc_path.exists():
        console.print(f"[bold red]Error:[/bold red] File not found: {doc_path}")
        raise typer.Exit(code=1)

    # ── Build providers ──────────────────────────────────────────────────
    # Per-agent overrides take precedence; fall back to --provider / --model
    p_provider = plaintiff_provider or provider
    p_model = plaintiff_model or model
    d_provider = defense_provider or provider
    d_model = defense_model or model

    try:
        pp = _build_provider(p_provider, p_model, ollama_url)
        dp = _build_provider(d_provider, d_model, ollama_url)
    except (ValueError, ImportError) as exc:
        console.print(f"[bold red]Provider error:[/bold red] {exc}")
        raise typer.Exit(code=1)

    # ── Run simulation ────────────────────────────────────────────────────
    reports = orchestrator.run_simulation(
        document_path=str(doc_path),
        plaintiff_provider=pp,
        defense_provider=dp,
        words_per_segment=words,
        max_rounds=rounds,
        convergence_threshold=convergence,
        parallel=parallel,
        max_workers=workers,
    )

    if max_segments is not None:
        reports = reports[:max_segments]

    if not reports:
        console.print("[yellow]No segments produced. Check your document.[/yellow]")
        raise typer.Exit(code=1)

    # ── Output ────────────────────────────────────────────────────────────
    generator.print_terminal_summary(reports)

    out_dir = Path(output_dir)
    stem = doc_path.stem
    generator.save_json(reports, out_dir / f"{stem}_warroom_report.json")

    if html:
        generator.save_html(reports, out_dir / f"{stem}_warroom_report.html")

    # Exit code 2 signals CRITICAL findings (useful in CI / review pipelines)
    has_critical = any(r.status == "CRITICAL" for r in reports)
    if has_critical:
        console.print(
            "\n[bold red]⚠  CRITICAL vulnerabilities remain.[/bold red] "
            "Manual legal review required before proceeding."
        )
        raise typer.Exit(code=2)

    console.print(
        "\n[bold green]✓ Simulation complete.[/bold green] "
        f"Reports in [cyan]{out_dir}/[/cyan]"
    )


def _build_provider(name: str, model: Optional[str], ollama_url: str):
    """Build a provider, injecting the Ollama URL when needed."""
    if name.lower() == "ollama":
        from warroom.providers.ollama_p import OllamaProvider
        return OllamaProvider(
            model=model or "llama3.1:8b",
            base_url=ollama_url,
        )
    return make_provider(name, model)


if __name__ == "__main__":
    app()
