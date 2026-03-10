#!/usr/bin/env python3
"""
Autonomous Legal War Game — CLI Entry Point

Usage examples:

  # Run on a PDF merger agreement, output to ./output/
  python main.py agreement.pdf

  # Text file, custom segment size, parallel mode, HTML report
  python main.py nda.txt --words 600 --parallel --html

  # Run only first 3 segments (useful for testing)
  python main.py big_agreement.pdf --max-segments 3

  # Full help
  python main.py --help
"""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Optional

import typer
from dotenv import load_dotenv
from rich.console import Console

from warroom import orchestrator
from warroom.report import generator

load_dotenv()
app = typer.Typer(add_completion=False, rich_markup_mode="rich")
console = Console()


@app.command()
def main(
    document: str = typer.Argument(
        ...,
        help="Path to the legal document (.pdf or .txt)",
    ),
    words: int = typer.Option(
        800,
        "--words",
        "-w",
        help="Soft word-count cap per segment (default 800 ≈ ~1½ contract pages).",
    ),
    parallel: bool = typer.Option(
        False,
        "--parallel",
        "-p",
        help="Process segments concurrently (faster, higher API concurrency).",
    ),
    workers: int = typer.Option(
        3,
        "--workers",
        help="Max parallel threads when --parallel is set.",
    ),
    output_dir: str = typer.Option(
        "output",
        "--output",
        "-o",
        help="Directory for JSON (and optional HTML) reports.",
    ),
    html: bool = typer.Option(
        False,
        "--html",
        help="Also generate a self-contained HTML report.",
    ),
    max_segments: Optional[int] = typer.Option(
        None,
        "--max-segments",
        help="Limit to the first N segments (useful for dry-runs).",
    ),
) -> None:
    """
    [bold cyan]Autonomous Legal War Game[/bold cyan] — M&A stress-testing simulation.

    Pits a [bold red]Plaintiff Agent (Red Team)[/bold red] against a
    [bold green]Defense Agent (Blue Team)[/bold green] on every clause of
    your document, then outputs a structured vulnerability and remediation report.
    """
    doc_path = Path(document)
    if not doc_path.exists():
        console.print(f"[bold red]Error:[/bold red] File not found: {doc_path}")
        raise typer.Exit(code=1)

    # Run the simulation
    reports = orchestrator.run_simulation(
        document_path=str(doc_path),
        words_per_segment=words,
        parallel=parallel,
        max_workers=workers,
    )

    # Optionally truncate (for dry-runs)
    if max_segments is not None:
        reports = reports[:max_segments]

    if not reports:
        console.print("[yellow]No segments produced. Check your document.[/yellow]")
        raise typer.Exit(code=1)

    # Print terminal report
    generator.print_terminal_summary(reports)

    # Save JSON
    out_dir = Path(output_dir)
    stem = doc_path.stem
    json_path = generator.save_json(reports, out_dir / f"{stem}_warroom_report.json")

    # Save HTML (optional)
    if html:
        generator.save_html(reports, out_dir / f"{stem}_warroom_report.html")

    # Exit with non-zero code if any segment is CRITICAL
    has_critical = any(r.status == "CRITICAL" for r in reports)
    if has_critical:
        console.print(
            "\n[bold red]⚠  CRITICAL vulnerabilities detected.[/bold red] "
            "Review the report before proceeding."
        )
        raise typer.Exit(code=2)

    console.print(
        "\n[bold green]✓ Simulation complete.[/bold green] "
        f"All outputs written to [cyan]{out_dir}/[/cyan]"
    )


if __name__ == "__main__":
    app()
