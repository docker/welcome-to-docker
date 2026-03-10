"""
Defense Agent — Blue Team

Receives the clause under attack and the Plaintiff's analysis, then
returns a hardened rewrite.  Accepts any LLMProvider.
"""

from __future__ import annotations

from ..models.schemas import DefenseAnalysis, PlaintiffAnalysis
from ..providers.base import LLMProvider

DEFENSE_SYSTEM = """\
You are the Defense Counsel Agent (Blue Team) and lead drafter for the \
acquiring party in a high-stakes Mergers & Acquisitions transaction.

JURISDICTION: Standard US corporate law, contract law precedents, and Delaware \
Court of Chancery standards.

OBJECTIVE: Fortify the contract against every vulnerability identified by the \
Plaintiff Agent while preserving the original business intent of the deal.

EXECUTION DIRECTIVES:
1. PRECISION REDRAFTING — Rewrite exploited clauses with absolute semantic \
   precision. Close every loophole in the Plaintiff's attack report.
2. RISK MITIGATION — Inject:
   • Exact numeric definitions (no vague qualifiers without explicit anchors)
   • Explicit liability caps with stated carve-outs
   • Severability and savings clauses where appropriate
   • Clear governing law and exclusive jurisdiction provisions
   • Knowledge qualifiers only where commercially necessary, with defined \
     Knowledge Persons
   • No "and/or" — use "and" or "or" explicitly
3. INTENT PRESERVATION — Do NOT alter the underlying financial or operational \
   agreement. Only alter the legal execution of that agreement. If a business \
   term cannot be hardened without changing its substance, flag it in \
   residual_risk.
4. DRAFTING STANDARDS — Formal contract English, active voice preferred, \
   sequential sub-clause numbering, all new terms defined inline.

If this is a re-hardening in round 2+: also address any new vulnerabilities \
the Plaintiff found in your previous rewrite.
"""


def run(
    provider: LLMProvider,
    clause_text: str,
    plaintiff_analysis: PlaintiffAnalysis,
    segment_id: str,
    round_number: int = 1,
) -> DefenseAnalysis:
    """
    Harden a clause against the Plaintiff's attack and return DefenseAnalysis.

    Args:
        provider:           Any LLMProvider (Anthropic, Ollama, …).
        clause_text:        The clause being defended (may be a prior hardened rewrite).
        plaintiff_analysis: Output from the Plaintiff Agent this round.
        segment_id:         Identifier used for logging.
        round_number:       Current round number.
    """
    attack_summary = _format_attack_vectors(plaintiff_analysis)

    user_message = (
        f"[SEGMENT: {segment_id} | ROUND: {round_number}]\n\n"
        f"━━━ CLAUSE TO HARDEN ━━━\n"
        f"{clause_text}\n\n"
        f"━━━ PLAINTIFF ATTACK REPORT ━━━\n"
        f"{attack_summary}\n\n"
        "Produce your defense report with fully hardened clause language."
    )

    return provider.complete_structured(
        system=DEFENSE_SYSTEM,
        messages=[{"role": "user", "content": user_message}],
        schema=DefenseAnalysis,
        max_tokens=12288,
    )


def _format_attack_vectors(analysis: PlaintiffAnalysis) -> str:
    lines = [
        f"Executive Summary: {analysis.executive_summary}",
        f"Highest Severity:  {analysis.highest_severity}/5",
        "",
        "Attack Vectors (highest severity first):",
    ]
    for i, v in enumerate(analysis.attack_vectors, 1):
        lines += [
            f"\n[{i}] {v.title}",
            f"    Severity:    {v.severity}/5  ({v.vulnerability_type})",
            f"    Clause Ref:  {v.clause_reference}",
            f"    Description: {v.description}",
            f"    Legal Theory:{v.legal_theory}",
            f"    Scenario:    {v.exploitation_scenario}",
            f"    Exposure:    {v.estimated_exposure}",
        ]
    return "\n".join(lines)
