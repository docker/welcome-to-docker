"""
Provider abstraction layer.

Every backend (Anthropic, Ollama, …) implements LLMProvider.
The rest of the codebase talks only to this interface, so swapping
models or endpoints requires zero changes to agent logic.

Internal message format is identical to the OpenAI chat API:
  {"role": "user"|"assistant"|"system", "content": "..."}
This is the most portable format and maps cleanly to both APIs.
"""

from __future__ import annotations

from typing import Protocol, Type, TypeVar
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)


class LLMProvider(Protocol):
    """
    Minimal interface every backend must implement.

    Two methods:
      complete()           — free-form text response
      complete_structured() — guaranteed Pydantic-model-shaped response
    """

    @property
    def model(self) -> str:
        """Human-readable model identifier (used for logging)."""
        ...

    def complete(
        self,
        system: str,
        messages: list[dict],
        max_tokens: int = 4096,
    ) -> str:
        """
        Send system + messages and return the assistant's text reply.
        """
        ...

    def complete_structured(
        self,
        system: str,
        messages: list[dict],
        schema: Type[T],
        max_tokens: int = 8192,
    ) -> T:
        """
        Send system + messages and return a validated Pydantic instance.
        The provider is responsible for enforcing the schema.
        """
        ...


def make_provider(provider_name: str, model: str | None = None) -> LLMProvider:
    """
    Factory — returns the right provider based on name string.

    Args:
        provider_name: "anthropic" or "ollama"
        model:         Optional model override. Defaults vary per provider.

    Usage:
        provider = make_provider("anthropic")
        provider = make_provider("ollama", model="qwen2.5:14b")
    """
    name = provider_name.lower().strip()
    if name == "anthropic":
        from .anthropic_p import AnthropicProvider
        return AnthropicProvider(model=model or "claude-opus-4-6")
    if name == "ollama":
        from .ollama_p import OllamaProvider
        return OllamaProvider(model=model or "llama3.1:8b")
    raise ValueError(
        f"Unknown provider '{provider_name}'. Choose 'anthropic' or 'ollama'."
    )
