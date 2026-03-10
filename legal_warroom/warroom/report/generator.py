"""
Report Generator

Transforms a list of SegmentReports into:
  1. A rich terminal summary (always shown).
  2. A JSON file (machine-readable, always saved).
  3. An HTML file (human-readable, optional).

The JSON structure is designed to be ingested by downstream systems
(dashboards, further LLM analysis, audit trails).
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import List

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text

from ..models.schemas import AttackVector, SegmentReport

console = Console()

# ── Severity colours ────────────────────────────────────────────────────────
_SEVERITY_STYLE = {
    1: "green",
    2: "yellow",
    3: "orange3",
    4: "red",
    5: "bold red",
}

_STATUS_STYLE = {
    "HARDENED": "bold green",
    "REQUIRES_REVIEW": "bold yellow",
    "CRITICAL": "bold red",
}


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def print_terminal_summary(reports: List[SegmentReport]) -> None:
    """Print a rich summary to the terminal after the simulation completes."""
    console.rule("\n[bold cyan]WAR GAME RESULTS — FINAL REPORT[/bold cyan]")
    _print_overview_table(reports)
    for report in reports:
        _print_segment_detail(report)
    _print_global_stats(reports)


def save_json(reports: List[SegmentReport], output_path: str | Path) -> Path:
    """Serialise all reports to a JSON file. Returns the path written."""
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    payload = {
        "simulation": "Autonomous Legal War Game — Simulation Alpha",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "segment_count": len(reports),
        "segments": [_segment_to_dict(r) for r in reports],
        "summary": _global_summary(reports),
    }

    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    console.print(f"\n[green]✓ JSON report saved:[/green] {path}")
    return path


def save_html(reports: List[SegmentReport], output_path: str | Path) -> Path:
    """Generate a self-contained HTML report. Returns the path written."""
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(_render_html(reports), encoding="utf-8")
    console.print(f"[green]✓ HTML report saved:[/green] {path}")
    return path


# ---------------------------------------------------------------------------
# Terminal rendering
# ---------------------------------------------------------------------------

def _print_overview_table(reports: List[SegmentReport]) -> None:
    table = Table(title="Segment Overview", show_lines=True, expand=True)
    table.add_column("Segment", style="cyan", no_wrap=True)
    table.add_column("Vectors", justify="right")
    table.add_column("Max Severity", justify="center")
    table.add_column("Risk Score", justify="right")
    table.add_column("Status", justify="center")
    table.add_column("Defense Confidence", justify="center")

    for r in reports:
        sev = r.plaintiff_analysis.highest_severity
        style = _SEVERITY_STYLE.get(sev, "white")
        status_style = _STATUS_STYLE.get(r.status, "white")

        table.add_row(
            r.segment_id,
            str(len(r.plaintiff_analysis.attack_vectors)),
            Text(f"{sev}/5", style=style),
            str(r.net_risk_score),
            Text(r.status, style=status_style),
            r.defense_analysis.confidence_level,
        )

    console.print(table)


def _print_segment_detail(report: SegmentReport) -> None:
    """Print the full Red/Blue breakdown for one segment."""
    sev = report.plaintiff_analysis.highest_severity
    panel_style = _SEVERITY_STYLE.get(sev, "white")

    console.print(
        Panel(
            f"[bold]Segment:[/bold] {report.segment_id}   "
            f"[bold]Risk Score:[/bold] {report.net_risk_score}/100   "
            f"[bold]Status:[/bold] [{_STATUS_STYLE.get(report.status, 'white')}]{report.status}[/]",
            title=f"[bold cyan]─── {report.segment_id} ───[/bold cyan]",
            border_style=panel_style,
        )
    )

    # Original clause excerpt
    excerpt = report.original_text[:400].replace("\n", " ")
    if len(report.original_text) > 400:
        excerpt += "…"
    console.print(f"[dim]Original:[/dim] {excerpt}\n")

    # Attack vectors
    console.print("[bold red]🔴  RED TEAM — ATTACK VECTORS[/bold red]")
    console.print(f"[dim]{report.plaintiff_analysis.executive_summary}[/dim]\n")
    for v in report.plaintiff_analysis.attack_vectors:
        _print_attack_vector(v)

    # Defense
    console.print("\n[bold green]🔵  BLUE TEAM — HARDENED CLAUSE[/bold green]")
    console.print(report.defense_analysis.fully_hardened_clause)
    console.print(
        f"\n[dim]Residual Risk:[/dim] {report.defense_analysis.residual_risk}"
    )
    console.print(
        f"[dim]Defense Confidence:[/dim] {report.defense_analysis.confidence_level}\n"
    )
    console.rule(style="dim")


def _print_attack_vector(v: AttackVector) -> None:
    style = _SEVERITY_STYLE.get(v.severity, "white")
    console.print(
        f"  [{style}][SEV {v.severity}][/]  [bold]{v.title}[/bold]  "
        f"[dim]({v.vulnerability_type})[/dim]"
    )
    console.print(f"    {v.description}")
    console.print(f"    [italic]Exposure: {v.estimated_exposure}[/italic]\n")


def _print_global_stats(reports: List[SegmentReport]) -> None:
    s = _global_summary(reports)
    console.rule("[bold cyan]GLOBAL STATISTICS[/bold cyan]")
    console.print(
        f"  Total segments:        {s['total_segments']}\n"
        f"  Total attack vectors:  {s['total_attack_vectors']}\n"
        f"  Critical segments:     {s['critical_segments']}\n"
        f"  Requires review:       {s['requires_review_segments']}\n"
        f"  Hardened:              {s['hardened_segments']}\n"
        f"  Average risk score:    {s['average_risk_score']:.1f}/100\n"
        f"  Peak severity:         {s['peak_severity']}/5\n"
    )


# ---------------------------------------------------------------------------
# JSON serialisation
# ---------------------------------------------------------------------------

def _segment_to_dict(r: SegmentReport) -> dict:
    return {
        "segment_id": r.segment_id,
        "net_risk_score": r.net_risk_score,
        "status": r.status,
        "original_text": r.original_text,
        "red_team": {
            "executive_summary": r.plaintiff_analysis.executive_summary,
            "highest_severity": r.plaintiff_analysis.highest_severity,
            "attack_vectors": [
                {
                    "title": v.title,
                    "severity": v.severity,
                    "vulnerability_type": v.vulnerability_type,
                    "clause_reference": v.clause_reference,
                    "description": v.description,
                    "legal_theory": v.legal_theory,
                    "exploitation_scenario": v.exploitation_scenario,
                    "estimated_exposure": v.estimated_exposure,
                }
                for v in r.plaintiff_analysis.attack_vectors
            ],
        },
        "blue_team": {
            "fully_hardened_clause": r.defense_analysis.fully_hardened_clause,
            "confidence_level": r.defense_analysis.confidence_level,
            "residual_risk": r.defense_analysis.residual_risk,
            "remedies": [
                {
                    "attack_vector_title": rem.attack_vector_title,
                    "hardened_language": rem.hardened_language,
                    "rationale": rem.rationale,
                }
                for rem in r.defense_analysis.remedies
            ],
        },
    }


def _global_summary(reports: List[SegmentReport]) -> dict:
    if not reports:
        return {}
    scores = [r.net_risk_score for r in reports]
    all_vectors = [v for r in reports for v in r.plaintiff_analysis.attack_vectors]
    return {
        "total_segments": len(reports),
        "total_attack_vectors": len(all_vectors),
        "critical_segments": sum(1 for r in reports if r.status == "CRITICAL"),
        "requires_review_segments": sum(1 for r in reports if r.status == "REQUIRES_REVIEW"),
        "hardened_segments": sum(1 for r in reports if r.status == "HARDENED"),
        "average_risk_score": sum(scores) / len(scores),
        "peak_severity": max((v.severity for v in all_vectors), default=0),
    }


# ---------------------------------------------------------------------------
# HTML rendering
# ---------------------------------------------------------------------------

_SEVERITY_HEX = {1: "#22c55e", 2: "#eab308", 3: "#f97316", 4: "#ef4444", 5: "#991b1b"}
_STATUS_HEX = {"HARDENED": "#22c55e", "REQUIRES_REVIEW": "#eab308", "CRITICAL": "#dc2626"}


def _render_html(reports: List[SegmentReport]) -> str:
    s = _global_summary(reports)
    segments_html = "\n".join(_segment_html(r) for r in reports)
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Legal War Game Report</title>
<style>
  body {{ font-family: 'Georgia', serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 2rem; }}
  h1 {{ color: #67e8f9; border-bottom: 1px solid #334155; padding-bottom: 0.5rem; }}
  h2 {{ color: #94a3b8; margin-top: 2rem; }}
  h3 {{ color: #cbd5e1; }}
  .card {{ background: #1e293b; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;
           border-left: 4px solid #334155; }}
  .critical {{ border-left-color: #dc2626; }}
  .requires_review {{ border-left-color: #eab308; }}
  .hardened {{ border-left-color: #22c55e; }}
  .badge {{ display: inline-block; padding: 2px 10px; border-radius: 999px;
            font-size: 0.75rem; font-weight: bold; margin-left: 8px; }}
  .attack {{ background: #1a1a2e; border-radius: 6px; padding: 1rem; margin: 0.75rem 0;
             border-left: 3px solid; }}
  .defense-box {{ background: #0d2137; border-radius: 6px; padding: 1.2rem; margin-top: 1rem;
                  white-space: pre-wrap; font-family: monospace; font-size: 0.85rem; }}
  .stats {{ display: flex; gap: 1rem; flex-wrap: wrap; }}
  .stat {{ background: #1e293b; padding: 1rem 1.5rem; border-radius: 8px; text-align: center; }}
  .stat-n {{ font-size: 2rem; font-weight: bold; color: #67e8f9; }}
  .stat-l {{ font-size: 0.75rem; color: #94a3b8; }}
  pre {{ white-space: pre-wrap; word-break: break-word; }}
  footer {{ margin-top: 3rem; color: #475569; font-size: 0.8rem; }}
</style>
</head>
<body>
<h1>⚖️ Autonomous Legal War Game — Simulation Alpha</h1>
<p style="color:#94a3b8">Generated: {generated}</p>

<h2>Global Statistics</h2>
<div class="stats">
  <div class="stat"><div class="stat-n">{s['total_segments']}</div><div class="stat-l">Segments</div></div>
  <div class="stat"><div class="stat-n">{s['total_attack_vectors']}</div><div class="stat-l">Attack Vectors</div></div>
  <div class="stat"><div class="stat-n" style="color:#dc2626">{s['critical_segments']}</div><div class="stat-l">Critical</div></div>
  <div class="stat"><div class="stat-n" style="color:#eab308">{s['requires_review_segments']}</div><div class="stat-l">Requires Review</div></div>
  <div class="stat"><div class="stat-n" style="color:#22c55e">{s['hardened_segments']}</div><div class="stat-l">Hardened</div></div>
  <div class="stat"><div class="stat-n">{s['average_risk_score']:.0f}</div><div class="stat-l">Avg Risk Score</div></div>
  <div class="stat"><div class="stat-n" style="color:{_SEVERITY_HEX.get(s['peak_severity'], '#fff')}">{s['peak_severity']}/5</div><div class="stat-l">Peak Severity</div></div>
</div>

<h2>Segment Reports</h2>
{segments_html}

<footer>Autonomous Legal War Game &mdash; For stress-testing purposes only. Not legal advice.</footer>
</body>
</html>"""


def _segment_html(r: SegmentReport) -> str:
    status_color = _STATUS_HEX.get(r.status, "#fff")
    css_class = r.status.lower().replace("_", "_")
    attacks_html = "\n".join(_attack_html(v) for v in r.plaintiff_analysis.attack_vectors)

    return f"""
<div class="card {css_class}">
  <h3>{r.segment_id}
    <span class="badge" style="background:{status_color};color:#000">{r.status}</span>
    <span class="badge" style="background:#334155;color:#e2e8f0">Risk {r.net_risk_score}/100</span>
  </h3>
  <details>
    <summary style="cursor:pointer;color:#94a3b8">Original Text</summary>
    <pre style="color:#64748b;font-size:0.8rem">{_esc(r.original_text)}</pre>
  </details>

  <h4 style="color:#f87171">🔴 Red Team — {len(r.plaintiff_analysis.attack_vectors)} Attack Vector(s)</h4>
  <p style="color:#94a3b8;font-style:italic">{_esc(r.plaintiff_analysis.executive_summary)}</p>
  {attacks_html}

  <h4 style="color:#4ade80">🔵 Blue Team — Hardened Clause</h4>
  <div class="defense-box">{_esc(r.defense_analysis.fully_hardened_clause)}</div>
  <p><strong>Residual Risk:</strong> <span style="color:#94a3b8">{_esc(r.defense_analysis.residual_risk)}</span></p>
  <p><strong>Defense Confidence:</strong> {r.defense_analysis.confidence_level}</p>
</div>"""


def _attack_html(v: AttackVector) -> str:
    color = _SEVERITY_HEX.get(v.severity, "#fff")
    return f"""
<div class="attack" style="border-left-color:{color}">
  <strong style="color:{color}">[SEV {v.severity}] {_esc(v.title)}</strong>
  <span style="color:#64748b;font-size:0.8rem"> — {_esc(v.vulnerability_type)}</span>
  <p>{_esc(v.description)}</p>
  <p><em>Exposure: {_esc(v.estimated_exposure)}</em></p>
</div>"""


def _esc(text: str) -> str:
    return (
        text
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )
