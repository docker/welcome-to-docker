"""
Multi-Round Adversarial Loop

This is the core of the automatic agent interaction.

What happens each round:
  1. Plaintiff Agent attacks the CURRENT clause text
     (round 1 = original, round 2+ = the previous Defense rewrite)
  2. Defense Agent hardens the current clause against those specific attacks
  3. The hardened clause becomes the input for the next round

The loop continues until:
  • Max rounds reached (configurable, default 3)
  • Convergence detected: severity dropped to ≤ convergence_threshold
    AND at least 2 rounds have run (so we always do at least one full exchange)
  • All attack vectors are severity 1 (nothing meaningful left to harden)

This means the agents are genuinely reacting to each other's output:
  - Plaintiff sees what Defense wrote and looks for NEW vulnerabilities in it
  - Defense sees what Plaintiff found in its own previous rewrite and patches again
"""

from __future__ import annotations

from rich.console import Console

from ..agents import plaintiff, defense
from ..document.processor import DocumentSegment
from ..models.schemas import AdversarialRound, IterativeSegmentReport
from ..providers.base import LLMProvider

console = Console()


def run_adversarial_loop(
    plaintiff_provider: LLMProvider,
    defense_provider: LLMProvider,
    segment: DocumentSegment,
    max_rounds: int = 3,
    convergence_threshold: int = 2,
) -> IterativeSegmentReport:
    """
    Run the full multi-round adversarial simulation for one document segment.

    Args:
        plaintiff_provider:    Provider for the Red Team agent.
        defense_provider:      Provider for the Blue Team agent.
                               Can be the same provider as plaintiff_provider.
        segment:               The document segment to stress-test.
        max_rounds:            Maximum number of Red→Blue exchanges (default 3).
        convergence_threshold: Stop early if max severity drops to this level
                               or below after at least 2 rounds (default 2).

    Returns:
        IterativeSegmentReport containing all rounds and the final hardened text.
    """
    rounds: list[AdversarialRound] = []
    current_clause = segment.text

    for round_num in range(1, max_rounds + 1):
        _log_round_start(segment.segment_id, round_num, max_rounds)

        # ── Red Team attacks ──────────────────────────────────────────────
        console.print(
            f"    [red]●[/red] [bold]Plaintiff Agent[/bold] attacking "
            f"{'original clause' if round_num == 1 else 'hardened clause'}…"
        )
        attack = plaintiff.run(
            provider=plaintiff_provider,
            clause_text=current_clause,
            segment_id=segment.segment_id,
            round_number=round_num,
        )
        console.print(
            f"      Found [bold red]{len(attack.attack_vectors)}[/bold red] attack "
            f"vector(s) — max severity [bold]{attack.highest_severity}[/bold]/5"
        )

        # ── Blue Team hardens ─────────────────────────────────────────────
        console.print(
            f"    [green]●[/green] [bold]Defense Agent[/bold] hardening clause…"
        )
        hardened = defense.run(
            provider=defense_provider,
            clause_text=current_clause,
            plaintiff_analysis=attack,
            segment_id=segment.segment_id,
            round_number=round_num,
        )
        console.print(
            f"      Hardened — confidence: [bold]{hardened.confidence_level}[/bold]"
        )

        # Record this round
        rounds.append(
            AdversarialRound(
                round_number=round_num,
                clause_text=current_clause,
                attack=attack,
                defense=hardened,
            )
        )

        # The next round attacks the freshly hardened clause
        current_clause = hardened.fully_hardened_clause

        # ── Convergence check ─────────────────────────────────────────────
        if round_num >= 2:
            if attack.highest_severity <= convergence_threshold:
                console.print(
                    f"\n    [cyan]✓ Converged[/cyan] — severity dropped to "
                    f"{attack.highest_severity} ≤ threshold {convergence_threshold}. "
                    f"Stopping after {round_num} round(s).\n"
                )
                break

        if attack.highest_severity == 1:
            console.print(
                f"\n    [cyan]✓ No meaningful vulnerabilities remain[/cyan] "
                f"(all severity 1). Stopping after {round_num} round(s).\n"
            )
            break

    report = IterativeSegmentReport(
        segment_id=segment.segment_id,
        original_text=segment.text,
        final_hardened_text=current_clause,
        rounds=rounds,
    )

    _log_round_summary(report)
    return report


# ---------------------------------------------------------------------------
# Logging helpers
# ---------------------------------------------------------------------------

def _log_round_start(segment_id: str, round_num: int, max_rounds: int) -> None:
    console.print(
        f"\n  [bold cyan]Round {round_num}/{max_rounds}[/bold cyan]  "
        f"[dim]({segment_id})[/dim]"
    )


def _log_round_summary(report: IterativeSegmentReport) -> None:
    traj = report.severity_trajectory
    arrow = " → ".join(str(s) for s in traj)
    status_style = {
        "HARDENED": "bold green",
        "REQUIRES_REVIEW": "bold yellow",
        "CRITICAL": "bold red",
    }.get(report.status, "white")

    console.print(
        f"\n  [{status_style}]■ {report.segment_id} complete[/]  "
        f"Severity trajectory: {arrow}  |  "
        f"Risk: {report.initial_risk_score} → {report.net_risk_score}  "
        f"(-{report.risk_reduction} pts)  |  "
        f"Status: [{status_style}]{report.status}[/]\n"
    )
