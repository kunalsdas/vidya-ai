"""DoubtAgent -- resolves student doubts with expert explanations."""

from nova_client import nova
from prompts.doubt import DOUBT_SYSTEM, doubt_prompt
from agents._utils import _safe_invoke


class DoubtAgent:
    """Predicts and resolves student doubts with expert explanations."""

    def resolve(self, question: str, topic: str) -> dict:
        prompt = doubt_prompt(question, topic)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            DOUBT_SYSTEM,
            max_tokens=1500,
            temperature=0.7,
        )

        return {"answer": raw.strip()}

    def resolve_stream(self, question: str, topic: str):
        """Stream the doubt resolution response."""
        prompt = doubt_prompt(question, topic)
        messages = [nova.user_message(prompt)]
        yield from nova.invoke_stream(messages, DOUBT_SYSTEM)
