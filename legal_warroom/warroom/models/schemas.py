"""
Pydantic schemas for structured outputs from each agent in the
Autonomous Legal War Game pipeline.
"""

from __future__ import annotations
from pydantic import BaseModel, Field
from typing import List


# ---------------------------------------------------------------------------
# Plaintiff Agent (Red Team) output
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
            "1=Minor ambiguity with negligible consequence. "
            "2=Moderate risk, localized financial exposure. "
            "3=Significant exposure, likely litigation target. "
            "4=Severe vulnerability, deal-threatening if exploited. "
            "5=Catastrophic structural failure, renders clause unenforceable."
        )
    )
    title: str = Field(description="Short, descriptive title for this attack vector.")
    description: str = Field(
        description="Precise legal description of why this language is vulnerable."
    )
    legal_theory: str = Field(
        description=(
            "The legal doctrine, case law principle, or statutory basis enabling "
            "this attack (e.g., contra proferentem, implied duty of good faith, "
            "Delaware chancery standards on MAE clauses). "
            "Do not fabricate specific case citations."
        )
    )
    exploitation_scenario: str = Field(
        description=(
            "A concrete scenario — including black-swan edge cases — demonstrating "
            "how a hostile party would exploit this vulnerability in litigation."
        )
    )
    estimated_exposure: str = Field(
        description=(
            "Estimated financial exposure or legal consequence if this vector is "
            "successfully exploited (e.g., 'uncapped indemnification liability', "
            "'rescission of the entire transaction', '$X–$Y range')."
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
            "A 2-4 sentence executive summary of the clause's overall vulnerability "
            "profile from the plaintiff's perspective."
        )
    )


# ---------------------------------------------------------------------------
# Defense Agent (Blue Team) output
# ---------------------------------------------------------------------------

class DefenseRemedy(BaseModel):
    attack_vector_title: str = Field(
        description="Exact title of the attack vector being neutralized."
    )
    hardened_language: str = Field(
        description=(
            "The rewritten clause language that closes this specific vulnerability. "
            "Must be precise, legally sound, and written in formal contract English."
        )
    )
    rationale: str = Field(
        description=(
            "Explanation of exactly how the rewritten language neutralizes the "
            "plaintiff's attack, referencing the specific legal theory."
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
        description="Per-attack-vector remediation details, one entry per attack vector addressed."
    )
    residual_risk: str = Field(
        description=(
            "Any remaining risk that cannot be fully mitigated without fundamentally "
            "altering the business terms of the deal. If none, state 'None identified.'"
        )
    )
    confidence_level: str = Field(
        description=(
            "Defense counsel's confidence in the hardened clause. "
            "One of: HIGH | MEDIUM | LOW"
        )
    )


# ---------------------------------------------------------------------------
# Final segment report (output of the full pipeline per document segment)
# ---------------------------------------------------------------------------

class SegmentReport(BaseModel):
    segment_id: str
    original_text: str
    plaintiff_analysis: PlaintiffAnalysis
    defense_analysis: DefenseAnalysis

    @property
    def net_risk_score(self) -> int:
        """
        Simple composite score: average severity * 20, capped at 100.
        Higher = more dangerous original clause.
        """
        vectors = self.plaintiff_analysis.attack_vectors
        if not vectors:
            return 0
        avg = sum(v.severity for v in vectors) / len(vectors)
        return min(100, round(avg * 20))

    @property
    def status(self) -> str:
        score = self.net_risk_score
        if score >= 80:
            return "CRITICAL"
        if score >= 50:
            return "REQUIRES_REVIEW"
        return "HARDENED"
