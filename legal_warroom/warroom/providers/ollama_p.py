"""
Ollama provider — run the entire war game 100% locally, no API costs.

Uses Ollama's OpenAI-compatible REST endpoint (default: localhost:11434).

Recommended models (support JSON mode and produce coherent legal output):
  • qwen2.5:14b       — best quality for legal reasoning locally
  • qwen2.5:7b        — good quality, fits on most consumer GPUs
  • llama3.1:8b       — solid, widely available
  • llama3.2:3b       — fast, lower quality
  • mistral:7b        — good instruction following

Install a model:
  ollama pull qwen2.5:14b

Structured outputs:
  Ollama supports response_format={"type": "json_object"} for JSON mode.
  The schema is injected into the system prompt so the model knows the shape.
  The response is then validated via Pydantic — if parsing fails, a clear
  error is raised telling the user to try a larger/better model.
"""

from __future__ import annotations

import json
from typing import Type, TypeVar

from pydantic import BaseModel, ValidationError

T = TypeVar("T", bound=BaseModel)

# Injected at the end of every structured-output system prompt
_SCHEMA_INSTRUCTION = (
    "\n\n━━━ OUTPUT FORMAT (STRICT) ━━━\n"
    "You MUST respond with a single valid JSON object that exactly matches "
    "the schema below. Do NOT include markdown fences, prose, or any text "
    "outside the JSON object.\n\n"
    "Schema:\n{schema}"
)


class OllamaProvider:
    def __init__(
        self,
        model: str = "llama3.1:8b",
        base_url: str = "http://localhost:11434/v1",
    ) -> None:
        try:
            from openai import OpenAI
        except ImportError as exc:
            raise ImportError(
                "The 'openai' package is required for the Ollama provider.\n"
                "Install it with:  pip install openai"
            ) from exc

        self._client = OpenAI(base_url=base_url, api_key="ollama")
        self._model = model

    @property
    def model(self) -> str:
        return self._model

    def complete(
        self,
        system: str,
        messages: list[dict],
        max_tokens: int = 4096,
    ) -> str:
        all_msgs = ([{"role": "system", "content": system}] if system else []) + messages
        response = self._client.chat.completions.create(
            model=self._model,
            messages=all_msgs,
            max_tokens=max_tokens,
            temperature=0.2,
        )
        return response.choices[0].message.content or ""

    def complete_structured(
        self,
        system: str,
        messages: list[dict],
        schema: Type[T],
        max_tokens: int = 8192,
    ) -> T:
        schema_json = json.dumps(schema.model_json_schema(), indent=2)
        enhanced_system = system + _SCHEMA_INSTRUCTION.format(schema=schema_json)

        all_msgs = (
            [{"role": "system", "content": enhanced_system}] + messages
        )

        response = self._client.chat.completions.create(
            model=self._model,
            messages=all_msgs,
            max_tokens=max_tokens,
            temperature=0.1,
            response_format={"type": "json_object"},
        )
        raw = response.choices[0].message.content or "{}"

        try:
            return schema.model_validate_json(raw)
        except ValidationError as exc:
            raise ValueError(
                f"Ollama model '{self._model}' returned JSON that does not match "
                f"the expected schema.\n"
                f"Try a larger model (e.g. qwen2.5:14b) for better compliance.\n"
                f"Validation errors:\n{exc}"
            ) from exc
