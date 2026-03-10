"""
Defense Agent — Blue Team

Receives the original clause text plus the Plaintiff Agent's attack
report, then returns a DefenseAnalysis containing:
  - A fully hardened rewrite of the clause.
  - Per-attack-vector remediation detail.
  - Residual risk and confidence assessment.

Uses claude-opus-4-6 with adaptive thinking and structured outputs.
"""

from __future__ import annotations

import json
import anthropic
from ..models.schemas import PlaintiffAnalysis, DefenseAnalysis

# ---------------------------------------------------------------------------
# System prompt (your exact prompt, hardened for structured output)
# ---------------------------------------------------------------------------

DEFENSE_SYSTEM = """\
You are the Defense Counsel Agent (Blue Team) and lead drafter for the \
acquiring party in a high-stakes Mergers & Acquisitions transaction.

JURISDICTION: Standard US corporate law, contract law precedents, and Delaware \
Court of Chancery standards.

OBJECTIVE: Fortify the contract against every vulnerability identified by the \
Plaintiff Agent. Rewrite, patch, and secure the language to neutralise all \
attack vectors while preserving the original business intent of the deal.

EXECUTION DIRECTIVES:
1. PRECISION REDRAFTING — Rewrite exploited clauses with absolute semantic \
   precision. Every defined term must be exact and internally consistent. \
   Close all loopholes identified by the Plaintiff Agent.
2. RISK MITIGATION — Inject necessary legal shields:
   • Exact numeric definitions (no vague qualifiers like "material" or \
     "reasonable" without explicit anchors).
   • Explicit liability caps with carve-outs stated positively.
   • Severability and savings clauses where appropriate.
   • Clear, unambiguous governing law and exclusive jurisdiction provisions.
   • Representations qualified by knowledge only where commercially necessary, \
     with defined Knowledge Persons.
   • No "and/or" constructions. Use "and" or "or" explicitly.
3. INTENT PRESERVATION — Do NOT alter the underlying financial or operational \
   agreement between the parties. Only alter the legal execution of that \
   agreement. If a business term cannot be hardened without changing its \
   substance, identify it in residual_risk.
4. DRAFTING STANDARDS — Use formal contract English. Avoid passive voice \
   where active voice is clearer. Define all new terms introduced. \
   Number sub-clauses sequentially.

OUTPUT: Respond in the exact JSON structure specified. Include one remedy \
entry for each attack vector you address. If a vector cannot be addressed \
without altering business terms, note it in residual_risk.
"""


# ---------------------------------------------------------------------------
# Agent call
# ---------------------------------------------------------------------------

def run(
    client: anthropic.Anthropic,
    clause_text: str,
    plaintiff_analysis: PlaintiffAnalysis,
    segment_id: str,
) -> DefenseAnalysis:
    """
    Send the clause and the Plaintiff's attack report to the Defense Agent.

    Args:
        client:             Initialised Anthropic client.
        clause_text:        The original, un-hardened contract text.
        plaintiff_analysis: Validated output from the Plaintiff Agent.
        segment_id:         Identifier used for logging/reporting.

    Returns:
        DefenseAnalysis — schema-validated Pydantic model.
    """
    # Serialise the plaintiff report so the Defense Agent can read it cleanly
    attack_summary = _format_attack_vectors(plaintiff_analysis)

    user_message = (
        f"[DOCUMENT SEGMENT: {segment_id}]\n\n"
        "═══ ORIGINAL CLAUSE (to be hardened) ═══\n"
        f"{clause_text}\n\n"
        "═══ PLAINTIFF AGENT ATTACK REPORT ═══\n"
        f"{attack_summary}\n\n"
        "═══ TASK ═══\n"
        "Analyse the attack vectors above and produce your defense report with "
        "fully hardened clause language."
    )

    response = client.messages.parse(
        model="claude-opus-4-6",
        max_tokens=12288,  # Defense rewrites can be lengthy
        thinking={"type": "adaptive"},
        system=DEFENSE_SYSTEM,
        messages=[{"role": "user", "content": user_message}],
        output_format=DefenseAnalysis,
    )

    return response.parsed_output


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _format_attack_vectors(analysis: PlaintiffAnalysis) -> str:
    """Render the PlaintiffAnalysis as readable text for the Defense Agent."""
    lines = [
        f"Executive Summary: {analysis.executive_summary}",
        f"Highest Severity: {analysis.highest_severity}/5",
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
