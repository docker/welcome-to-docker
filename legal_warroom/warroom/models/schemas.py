"""
Pydantic schemas for structured outputs from each agent, plus
data classes that track the full multi-round adversarial simulation.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Plaintiff Agent (Red Team) — structured output
# ---------------------------------------------------------------------------

class AttackVector(BaseModel):
    clause_reference: str = Field(
        description="The specific clause, sub-clause, or defined term being attacked "
                    "(e.g., 'Section 7.3(b)', 'Definition of Material Adverse Effect')."
    )
    vulnerability_type: str = Field(
        description=(
            "Category of vulnerability. One of: AMBIGUITY | INDEMNIFICATION_GAP | "
            "LIABILITY_EXPOSURE | DEFINITION_FAILURE | EDGE_CASE | "
            "JURISDICTIONAL_CONFLICT | WAIVER_TRAP | REPRESENTATION_BREACH"
        )
    )
    severity: int = Field(
        description=(
            "Integer 1-5. "
            "1=Minor ambiguity, negligible consequence. "
            "2=Moderate risk, localised financial exposure. "
            "3=Significant exposure, likely litigation target. "
            "4=Severe vulnerability, deal-threatening if exploited. "
            "5=Catastrophic structural failure — unenforceable or unlimited liability."
        )
    )
    title: str = Field(description="Short, descriptive title for this attack vector.")
    description: str = Field(
        description="Precise legal description of why this language is vulnerable."
    )
    legal_theory: str = Field(
        description=(
            "The legal doctrine or principle enabling this attack "
            "(e.g., contra proferentem, implied duty of good faith, Delaware MAE standards). "
            "Do not fabricate specific case citations."
        )
    )
    exploitation_scenario: str = Field(
        description=(
            "A concrete scenario — including black-swan edge cases — showing how a "
            "hostile party would exploit this vulnerability in litigation."
        )
    )
    estimated_exposure: str = Field(
        description=(
            "Estimated financial exposure or legal consequence if successfully exploited "
            "(e.g., 'uncapped indemnification liability', 'rescission of entire transaction')."
        )
    )


class PlaintiffAnalysis(BaseModel):
    attack_vectors: List[AttackVector] = Field(
        description="All identified attack vectors, ordered highest-severity first."
    )
    highest_severity: int = Field(
        description="The highest severity integer (1-5) among all attack vectors."
    )
    executive_summary: str = Field(
        description=(
            "2-4 sentence executive summary of the clause's overall vulnerability "
            "profile from the plaintiff's perspective."
        )
    )


# ---------------------------------------------------------------------------
# Defense Agent (Blue Team) — structured output
# ---------------------------------------------------------------------------

class DefenseRemedy(BaseModel):
    attack_vector_title: str = Field(
        description="Exact title of the attack vector being neutralised."
    )
    hardened_language: str = Field(
        description=(
            "The rewritten clause language that closes this specific vulnerability. "
            "Precise, legally sound, formal contract English."
        )
    )
    rationale: str = Field(
        description=(
            "Explanation of how the rewritten language neutralises the plaintiff's "
            "attack, referencing the specific legal theory."
        )
    )


class DefenseAnalysis(BaseModel):
    fully_hardened_clause: str = Field(
        description=(
            "The complete, integrated rewritten clause incorporating all remediations. "
            "Must preserve the original business intent of the agreement."
        )
    )
    remedies: List[DefenseRemedy] = Field(
        description="Per-attack-vector remediation details."
    )
    residual_risk: str = Field(
        description=(
            "Any remaining risk that cannot be fully mitigated without altering "
            "the business terms. If none, state 'None identified.'"
        )
    )
    confidence_level: str = Field(
        description="Defense counsel's confidence: HIGH | MEDIUM | LOW"
    )


# ---------------------------------------------------------------------------
# Adversarial loop tracking — Python dataclasses (not Pydantic, not sent to API)
# ---------------------------------------------------------------------------

@dataclass
class AdversarialRound:
    """One complete Red → Blue exchange within the multi-round loop."""
    round_number: int
    clause_text: str          # The clause that was attacked THIS round
    attack: PlaintiffAnalysis
    defense: DefenseAnalysis


@dataclass
class IterativeSegmentReport:
    """
    Full report for one document segment after all adversarial rounds.

    The 'rounds' list records every Red→Blue exchange so reviewers can
    see how the clause evolved across iterations.
    """
    segment_id: str
    original_text: str
    final_hardened_text: str  # The clause text after the last Defense pass
    rounds: List[AdversarialRound] = field(default_factory=list)

    # ── Computed properties ─────────────────────────────────────────────

    @property
    def total_rounds(self) -> int:
        return len(self.rounds)

    @property
    def severity_trajectory(self) -> list[int]:
        """Max severity per round — shows convergence over time."""
        return [r.attack.highest_severity for r in self.rounds]

    @property
    def converged(self) -> bool:
        """True if severity dropped at least 2 points across the simulation."""
        traj = self.severity_trajectory
        return len(traj) >= 2 and (traj[0] - traj[-1]) >= 2

    @property
    def final_attack(self) -> PlaintiffAnalysis | None:
        return self.rounds[-1].attack if self.rounds else None

    @property
    def final_defense(self) -> DefenseAnalysis | None:
        return self.rounds[-1].defense if self.rounds else None

    @property
    def net_risk_score(self) -> int:
        """Risk score (0-100) based on the FINAL round's attack severity."""
        if not self.rounds:
            return 0
        vectors = self.rounds[-1].attack.attack_vectors
        if not vectors:
            return 0
        avg = sum(v.severity for v in vectors) / len(vectors)
        return min(100, round(avg * 20))

    @property
    def initial_risk_score(self) -> int:
        """Risk score of the FIRST round (before any hardening)."""
        if not self.rounds:
            return 0
        vectors = self.rounds[0].attack.attack_vectors
        if not vectors:
            return 0
        avg = sum(v.severity for v in vectors) / len(vectors)
        return min(100, round(avg * 20))

    @property
    def risk_reduction(self) -> int:
        """Points reduced: initial_risk_score - net_risk_score."""
        return max(0, self.initial_risk_score - self.net_risk_score)

    @property
    def status(self) -> str:
        score = self.net_risk_score
        if score >= 80:
            return "CRITICAL"
        if score >= 50:
            return "REQUIRES_REVIEW"
        return "HARDENED"
