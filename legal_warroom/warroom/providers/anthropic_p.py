"""
Anthropic provider — uses the official anthropic SDK.

Features used:
  • claude-opus-4-6 with adaptive thinking for deep legal reasoning
  • client.messages.parse() for schema-validated structured outputs
  • Streaming-safe: max_tokens capped at 12 288 (no streaming needed at this size)
"""

from __future__ import annotations

from typing import Type, TypeVar

import anthropic
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)


class AnthropicProvider:
    def __init__(self, model: str = "claude-opus-4-6") -> None:
        self._client = anthropic.Anthropic()
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
        response = self._client.messages.create(
            model=self._model,
            max_tokens=max_tokens,
            thinking={"type": "adaptive"},
            system=system,
            messages=messages,
        )
        for block in response.content:
            if block.type == "text":
                return block.text
        return ""

    def complete_structured(
        self,
        system: str,
        messages: list[dict],
        schema: Type[T],
        max_tokens: int = 8192,
    ) -> T:
        response = self._client.messages.parse(
            model=self._model,
            max_tokens=max_tokens,
            thinking={"type": "adaptive"},
            system=system,
            messages=messages,
            output_format=schema,
        )
        return response.parsed_output
