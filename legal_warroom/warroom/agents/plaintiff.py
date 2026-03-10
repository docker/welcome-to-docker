"""
Plaintiff Agent — Red Team

Receives a document segment and returns a PlaintiffAnalysis with
prioritised attack vectors graded 1-5.

Uses claude-opus-4-6 with adaptive thinking and structured outputs
so the Orchestrator receives machine-readable, schema-validated data.
"""

from __future__ import annotations

import anthropic
from ..models.schemas import PlaintiffAnalysis

# ---------------------------------------------------------------------------
# System prompt (your exact prompt, hardened for structured output)
# ---------------------------------------------------------------------------

PLAINTIFF_SYSTEM = """\
You are the Plaintiff Counsel Agent (Red Team) in the Autonomous Legal War Game.
You represent a hostile, highly litigious entity — a predatory acquirer, a \
disgruntled shareholder, or a regulator with unlimited resources — seeking to \
exploit, break, or extract punitive damages from the provided contract language.

JURISDICTION: Standard US corporate law, contract law precedents, and Delaware \
Court of Chancery standards.

OBJECTIVE: Perform a ruthless, exhaustive analysis of the provided clause or \
section.

EXECUTION DIRECTIVES:
1. HUNT FOR AMBIGUITY — Identify poorly defined terms, vague timelines, \
   contradictory obligations, and undefined conditions precedent.
2. EXPLOIT INDEMNIFICATION & LIABILITY — Find scenarios where the drafting \
   party is exposed to uncapped financial risk, breach of warranty, or \
   third-party liabilities.
3. STRESS-TEST EDGE CASES — Formulate highly improbable but legally plausible \
   "black swan" scenarios the current language fails to protect against. \
   Think regulatory intervention, force majeure, insolvency events, \
   jurisdictional conflicts, and successor liability.
4. ATTACK DEFINITIONS — Challenge every defined term. If it is absent, \
   over-broad, or inconsistent with usage elsewhere, flag it.

OUTPUT: You MUST respond in the exact JSON structure specified. Do not add \
prose outside the JSON. Do not fabricate specific case citations or docket \
numbers. Reference legal doctrines and principles only.

SEVERITY SCALE:
  1 = Minor ambiguity, negligible consequence
  2 = Moderate risk, localised financial exposure
  3 = Significant exposure, likely litigation target
  4 = Severe vulnerability, deal-threatening if exploited
  5 = Catastrophic structural failure — renders clause unenforceable or \
      exposes party to unlimited liability
"""


# ---------------------------------------------------------------------------
# Agent call
# ---------------------------------------------------------------------------

def run(
    client: anthropic.Anthropic,
    clause_text: str,
    segment_id: str,
) -> PlaintiffAnalysis:
    """
    Send the clause to the Plaintiff Agent and return a validated
    PlaintiffAnalysis.

    Args:
        client:       Initialised Anthropic client.
        clause_text:  The raw contract text to attack.
        segment_id:   Identifier used for logging/reporting.

    Returns:
        PlaintiffAnalysis — schema-validated Pydantic model.
    """
    user_message = (
        f"[DOCUMENT SEGMENT: {segment_id}]\n\n"
        f"{clause_text}\n\n"
        "Analyse the above clause and produce your attack report."
    )

    response = client.messages.parse(
        model="claude-opus-4-6",
        max_tokens=8192,
        thinking={"type": "adaptive"},
        system=PLAINTIFF_SYSTEM,
        messages=[{"role": "user", "content": user_message}],
        output_format=PlaintiffAnalysis,
    )

    return response.parsed_output
