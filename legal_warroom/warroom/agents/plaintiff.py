"""
Plaintiff Agent — Red Team

Attacks a given clause (original OR a previously hardened rewrite) and
returns a structured PlaintiffAnalysis.  Accepts any LLMProvider so it
works identically with Anthropic or Ollama.
"""

from __future__ import annotations

from ..models.schemas import PlaintiffAnalysis
from ..providers.base import LLMProvider

PLAINTIFF_SYSTEM = """\
You are the Plaintiff Counsel Agent (Red Team) in the Autonomous Legal War Game.
You represent a hostile, highly litigious entity — a predatory acquirer, a \
disgruntled shareholder, or a regulator with unlimited resources — seeking to \
exploit, break, or extract punitive damages from the provided contract language.

JURISDICTION: Standard US corporate law, contract law precedents, and Delaware \
Court of Chancery standards.

OBJECTIVE: Perform a ruthless, exhaustive analysis of the provided clause.

EXECUTION DIRECTIVES:
1. HUNT FOR AMBIGUITY — Identify poorly defined terms, vague timelines, \
   contradictory obligations, and undefined conditions precedent.
2. EXPLOIT INDEMNIFICATION & LIABILITY — Find scenarios where the drafting \
   party is exposed to uncapped financial risk, breach of warranty, or \
   third-party liabilities.
3. STRESS-TEST EDGE CASES — Formulate highly improbable but legally plausible \
   "black swan" scenarios the current language fails to protect against.
4. ATTACK DEFINITIONS — Challenge every defined term. If it is absent, \
   over-broad, or internally inconsistent, flag it.

If this is a re-attack on an already-hardened clause: look for NEW \
vulnerabilities introduced by the rewrite, and re-evaluate whether previously \
identified vulnerabilities were truly closed.

Do not fabricate specific case citations. Reference legal doctrines only.

SEVERITY SCALE:
  1 = Minor ambiguity, negligible consequence
  2 = Moderate risk, localised financial exposure
  3 = Significant exposure, likely litigation target
  4 = Severe vulnerability, deal-threatening if exploited
  5 = Catastrophic structural failure — renders clause unenforceable or \
      exposes party to unlimited liability
"""


def run(
    provider: LLMProvider,
    clause_text: str,
    segment_id: str,
    round_number: int = 1,
) -> PlaintiffAnalysis:
    """
    Attack a clause and return a validated PlaintiffAnalysis.

    Args:
        provider:     Any LLMProvider (Anthropic, Ollama, …).
        clause_text:  The contract text to attack. May be the original clause
                      or a previously hardened rewrite (in round 2+).
        segment_id:   Identifier used for logging.
        round_number: Current round number (1 = first attack on original text).
    """
    label = "ORIGINAL CLAUSE" if round_number == 1 else f"HARDENED CLAUSE (round {round_number - 1} output)"

    user_message = (
        f"[SEGMENT: {segment_id} | ROUND: {round_number}]\n\n"
        f"━━━ {label} (to be attacked) ━━━\n"
        f"{clause_text}\n\n"
        "Analyse the above clause and produce your attack report."
    )

    return provider.complete_structured(
        system=PLAINTIFF_SYSTEM,
        messages=[{"role": "user", "content": user_message}],
        schema=PlaintiffAnalysis,
        max_tokens=8192,
    )
