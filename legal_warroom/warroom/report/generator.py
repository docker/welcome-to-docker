"""
Report Generator

Produces:
  1. Rich terminal summary with multi-round progression tables.
  2. JSON file — full structured data for every round of every segment.
  3. HTML file — dark-themed, self-contained, shows severity trajectory.
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

from ..models.schemas import IterativeSegmentReport

console = Console()

_SEVERITY_STYLE = {1: "green", 2: "yellow", 3: "orange3", 4: "red", 5: "bold red"}
_STATUS_STYLE = {
    "HARDENED": "bold green",
    "REQUIRES_REVIEW": "bold yellow",
    "CRITICAL": "bold red",
}
_SEVERITY_HEX = {1: "#22c55e", 2: "#eab308", 3: "#f97316", 4: "#ef4444", 5: "#991b1b"}
_STATUS_HEX = {"HARDENED": "#22c55e", "REQUIRES_REVIEW": "#eab308", "CRITICAL": "#dc2626"}


# ---------------------------------------------------------------------------
# Terminal
# ---------------------------------------------------------------------------

def print_terminal_summary(reports: List[IterativeSegmentReport]) -> None:
    console.rule("\n[bold cyan]WAR GAME RESULTS — FINAL REPORT[/bold cyan]")
    _print_overview_table(reports)
    for report in reports:
        _print_segment_detail(report)
    _print_global_stats(reports)


def _print_overview_table(reports: List[IterativeSegmentReport]) -> None:
    table = Table(title="Segment Overview", show_lines=True, expand=True)
    table.add_column("Segment", style="cyan", no_wrap=True)
    table.add_column("Rounds", justify="center")
    table.add_column("Severity Trajectory", justify="center")
    table.add_column("Risk (start→end)", justify="center")
    table.add_column("Reduction", justify="right")
    table.add_column("Status", justify="center")
    table.add_column("Converged?", justify="center")

    for r in reports:
        traj = " → ".join(str(s) for s in r.severity_trajectory)
        status_style = _STATUS_STYLE.get(r.status, "white")
        conv = "[green]Yes[/green]" if r.converged else "[yellow]No[/yellow]"
        table.add_row(
            r.segment_id,
            str(r.total_rounds),
            traj,
            f"{r.initial_risk_score} → {r.net_risk_score}",
            f"-{r.risk_reduction}",
            Text(r.status, style=status_style),
            conv,
        )
    console.print(table)


def _print_segment_detail(report: IterativeSegmentReport) -> None:
    status_style = _STATUS_STYLE.get(report.status, "white")
    initial_sev = report.rounds[0].attack.highest_severity if report.rounds else 1
    console.print(
        Panel(
            f"[bold]Segment:[/bold] {report.segment_id}   "
            f"[bold]Rounds:[/bold] {report.total_rounds}   "
            f"[bold]Risk:[/bold] {report.initial_risk_score} → {report.net_risk_score}   "
            f"[bold]Status:[/bold] [{status_style}]{report.status}[/]",
            title=f"[bold cyan]─── {report.segment_id} ───[/bold cyan]",
            border_style=_SEVERITY_STYLE.get(initial_sev, "white"),
        )
    )

    excerpt = report.original_text[:300].replace("\n", " ")
    if len(report.original_text) > 300:
        excerpt += "…"
    console.print(f"[dim]Original:[/dim] {excerpt}\n")

    for rnd in report.rounds:
        console.print(
            f"[bold]Round {rnd.round_number}[/bold]  "
            f"[red]Red Team — {len(rnd.attack.attack_vectors)} vector(s) "
            f"(max sev {rnd.attack.highest_severity}/5)[/red]"
        )
        console.print(f"  [dim]{rnd.attack.executive_summary}[/dim]")
        for v in rnd.attack.attack_vectors:
            s = _SEVERITY_STYLE.get(v.severity, "white")
            console.print(f"  [{s}][{v.severity}][/] {v.title} — {v.estimated_exposure}")
        console.print(
            f"\n  [green]Blue Team — Confidence: {rnd.defense.confidence_level}[/green]"
        )
        console.print(f"  [dim]Residual risk: {rnd.defense.residual_risk}[/dim]\n")

    console.print("[bold green]Final Hardened Clause:[/bold green]")
    console.print(report.final_hardened_text)
    console.rule(style="dim")


def _print_global_stats(reports: List[IterativeSegmentReport]) -> None:
    s = _global_summary(reports)
    console.rule("[bold cyan]GLOBAL STATISTICS[/bold cyan]")
    console.print(
        f"  Segments processed:    {s['total_segments']}\n"
        f"  Total rounds run:      {s['total_rounds']}\n"
        f"  Total attack vectors:  {s['total_attack_vectors']}\n"
        f"  Segments converged:    {s['converged_segments']}\n"
        f"  Critical remaining:    {s['critical_segments']}\n"
        f"  Requires review:       {s['requires_review_segments']}\n"
        f"  Fully hardened:        {s['hardened_segments']}\n"
        f"  Avg risk reduction:    {s['avg_risk_reduction']:.1f} pts\n"
        f"  Peak initial severity: {s['peak_initial_severity']}/5\n"
        f"  Peak final severity:   {s['peak_final_severity']}/5\n"
    )


# ---------------------------------------------------------------------------
# JSON
# ---------------------------------------------------------------------------

def save_json(reports: List[IterativeSegmentReport], output_path: str | Path) -> Path:
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


def _segment_to_dict(r: IterativeSegmentReport) -> dict:
    return {
        "segment_id": r.segment_id,
        "total_rounds": r.total_rounds,
        "severity_trajectory": r.severity_trajectory,
        "initial_risk_score": r.initial_risk_score,
        "final_risk_score": r.net_risk_score,
        "risk_reduction": r.risk_reduction,
        "converged": r.converged,
        "status": r.status,
        "original_text": r.original_text,
        "final_hardened_text": r.final_hardened_text,
        "rounds": [
            {
                "round_number": rnd.round_number,
                "clause_text_attacked": rnd.clause_text,
                "red_team": {
                    "highest_severity": rnd.attack.highest_severity,
                    "executive_summary": rnd.attack.executive_summary,
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
                        for v in rnd.attack.attack_vectors
                    ],
                },
                "blue_team": {
                    "fully_hardened_clause": rnd.defense.fully_hardened_clause,
                    "confidence_level": rnd.defense.confidence_level,
                    "residual_risk": rnd.defense.residual_risk,
                    "remedies": [
                        {
                            "attack_vector_title": rem.attack_vector_title,
                            "hardened_language": rem.hardened_language,
                            "rationale": rem.rationale,
                        }
                        for rem in rnd.defense.remedies
                    ],
                },
            }
            for rnd in r.rounds
        ],
    }


def _global_summary(reports: List[IterativeSegmentReport]) -> dict:
    if not reports:
        return {}
    all_initial = [
        v for r in reports for v in (r.rounds[0].attack.attack_vectors if r.rounds else [])
    ]
    all_final = [
        v for r in reports for v in (r.rounds[-1].attack.attack_vectors if r.rounds else [])
    ]
    return {
        "total_segments": len(reports),
        "total_rounds": sum(r.total_rounds for r in reports),
        "total_attack_vectors": sum(
            sum(len(rnd.attack.attack_vectors) for rnd in r.rounds) for r in reports
        ),
        "converged_segments": sum(1 for r in reports if r.converged),
        "critical_segments": sum(1 for r in reports if r.status == "CRITICAL"),
        "requires_review_segments": sum(1 for r in reports if r.status == "REQUIRES_REVIEW"),
        "hardened_segments": sum(1 for r in reports if r.status == "HARDENED"),
        "avg_risk_reduction": sum(r.risk_reduction for r in reports) / len(reports),
        "peak_initial_severity": max((v.severity for v in all_initial), default=0),
        "peak_final_severity": max((v.severity for v in all_final), default=0),
    }


# ---------------------------------------------------------------------------
# HTML
# ---------------------------------------------------------------------------

def save_html(reports: List[IterativeSegmentReport], output_path: str | Path) -> Path:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(_render_html(reports), encoding="utf-8")
    console.print(f"[green]✓ HTML report saved:[/green] {path}")
    return path


def _render_html(reports: List[IterativeSegmentReport]) -> str:
    s = _global_summary(reports)
    segments_html = "\n".join(_segment_html(r) for r in reports)
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><title>Legal War Game Report</title>
<style>
body{{font-family:'Georgia',serif;background:#0f172a;color:#e2e8f0;margin:0;padding:2rem}}
h1{{color:#67e8f9;border-bottom:1px solid #334155;padding-bottom:.5rem}}
h2{{color:#94a3b8;margin-top:2rem}}h3{{color:#cbd5e1}}h4{{margin:.5rem 0}}
.card{{background:#1e293b;border-radius:8px;padding:1.5rem;margin:1.5rem 0;border-left:4px solid #334155}}
.CRITICAL{{border-left-color:#dc2626}}.REQUIRES_REVIEW{{border-left-color:#eab308}}.HARDENED{{border-left-color:#22c55e}}
.badge{{display:inline-block;padding:2px 10px;border-radius:999px;font-size:.75rem;font-weight:bold;margin-left:8px}}
.round{{background:#0f172a;border-radius:6px;padding:1rem;margin:.75rem 0;border:1px solid #334155}}
.atk{{background:#1a0a0a;border-radius:4px;padding:.75rem;margin:.5rem 0;border-left:3px solid}}
.dbox{{background:#0d2137;border-radius:6px;padding:1rem;white-space:pre-wrap;font-family:monospace;font-size:.82rem;margin-top:.5rem}}
.stats{{display:flex;gap:1rem;flex-wrap:wrap}}.stat{{background:#1e293b;padding:1rem 1.5rem;border-radius:8px;text-align:center}}
.stat-n{{font-size:2rem;font-weight:bold;color:#67e8f9}}.stat-l{{font-size:.75rem;color:#94a3b8}}
.traj{{display:flex;gap:.4rem;align-items:center;margin:.5rem 0}}
.sev{{width:28px;height:28px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:.85rem;color:#000}}
pre{{white-space:pre-wrap;word-break:break-word}}details summary{{cursor:pointer;color:#94a3b8}}
footer{{margin-top:3rem;color:#475569;font-size:.8rem}}
</style>
</head>
<body>
<h1>⚖️ Autonomous Legal War Game — Simulation Alpha</h1>
<p style="color:#94a3b8">Generated: {generated}</p>
<h2>Global Statistics</h2>
<div class="stats">
  <div class="stat"><div class="stat-n">{s['total_segments']}</div><div class="stat-l">Segments</div></div>
  <div class="stat"><div class="stat-n">{s['total_rounds']}</div><div class="stat-l">Total Rounds</div></div>
  <div class="stat"><div class="stat-n">{s['total_attack_vectors']}</div><div class="stat-l">Attack Vectors</div></div>
  <div class="stat"><div class="stat-n" style="color:#22c55e">{s['converged_segments']}</div><div class="stat-l">Converged</div></div>
  <div class="stat"><div class="stat-n" style="color:#dc2626">{s['critical_segments']}</div><div class="stat-l">Critical</div></div>
  <div class="stat"><div class="stat-n">{s['avg_risk_reduction']:.0f} pts</div><div class="stat-l">Avg Risk Reduction</div></div>
  <div class="stat"><div class="stat-n">{s['peak_initial_severity']}→{s['peak_final_severity']}</div><div class="stat-l">Peak Severity</div></div>
</div>
<h2>Segment Reports</h2>
{segments_html}
<footer>Autonomous Legal War Game — For stress-testing purposes only. Not legal advice.</footer>
</body></html>"""


def _segment_html(r: IterativeSegmentReport) -> str:
    color = _STATUS_HEX.get(r.status, "#fff")
    traj = "".join(
        f'<div class="sev" style="background:{_SEVERITY_HEX.get(s, "#555")}">{s}</div>'
        + ('<span style="color:#64748b">→</span>' if i < len(r.severity_trajectory) - 1 else "")
        for i, s in enumerate(r.severity_trajectory)
    )
    rounds_html = "\n".join(_round_html(rnd) for rnd in r.rounds)
    conv_badge = "<span class='badge' style='background:#166534;color:#fff'>Converged</span>" if r.converged else ""
    return f"""
<div class="card {r.status}">
  <h3>{r.segment_id}
    <span class="badge" style="background:{color};color:#000">{r.status}</span>
    <span class="badge" style="background:#334155">Risk {r.initial_risk_score}→{r.net_risk_score} (-{r.risk_reduction})</span>
    <span class="badge" style="background:#334155">{r.total_rounds} round(s)</span>
    {conv_badge}
  </h3>
  <div class="traj">{traj}</div>
  <details><summary>Original clause</summary><pre style="color:#64748b;font-size:.8rem">{_esc(r.original_text)}</pre></details>
  {rounds_html}
  <h4 style="color:#4ade80">Final Hardened Clause</h4>
  <div class="dbox">{_esc(r.final_hardened_text)}</div>
</div>"""


def _round_html(rnd) -> str:
    attacks = "".join(
        f'<div class="atk" style="border-left-color:{_SEVERITY_HEX.get(v.severity,"#fff")}">'
        f'<strong style="color:{_SEVERITY_HEX.get(v.severity,"#fff")}">[{v.severity}] {_esc(v.title)}</strong>'
        f' <span style="color:#64748b;font-size:.8rem">— {_esc(v.vulnerability_type)}</span>'
        f'<p>{_esc(v.description)}</p>'
        f'<p><em>Exposure: {_esc(v.estimated_exposure)}</em></p></div>'
        for v in rnd.attack.attack_vectors
    )
    return f"""
<div class="round">
  <h4>Round {rnd.round_number}
    <span style="color:#f87171">🔴 {len(rnd.attack.attack_vectors)} vector(s) · max sev {rnd.attack.highest_severity}/5</span>
    &nbsp;|&nbsp;
    <span style="color:#4ade80">🔵 Confidence: {rnd.defense.confidence_level}</span>
  </h4>
  <p style="color:#94a3b8;font-style:italic">{_esc(rnd.attack.executive_summary)}</p>
  {attacks}
  <details>
    <summary style="color:#4ade80">Defense rewrite (round {rnd.round_number})</summary>
    <div class="dbox">{_esc(rnd.defense.fully_hardened_clause)}</div>
    <p><em>Residual risk: {_esc(rnd.defense.residual_risk)}</em></p>
  </details>
</div>"""


def _esc(t: str) -> str:
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
