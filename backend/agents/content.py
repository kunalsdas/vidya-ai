"""ContentAgent -- generates deep topic explanations and micro-learning reels."""

import json
import logging
import re

from nova_client import nova
from prompts.content import TOPIC_CONTENT_SYSTEM, topic_content_prompt
from prompts.engagement import REELS_SYSTEM, reels_prompt
from agents._utils import _safe_invoke

logger = logging.getLogger(__name__)


class ContentAgent:
    """Generates deep topic explanations with intuition, examples, and exam focus."""

    def generate(self, topic: str, subject: str, mode: str = "concept") -> dict:
        prompt = topic_content_prompt(topic, subject, mode)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            TOPIC_CONTENT_SYSTEM,
            max_tokens=8000,
            temperature=0.7,
        )

        content, metadata = self._split_content_json(raw)

        return {
            "content": content,
            "prerequisites": metadata.get("prerequisites", []),
            "related":       metadata.get("related", []),
            "doubts":        metadata.get("doubts", []),
            "questions":     metadata.get("questions", []),
            "graph":         metadata.get("graph", {"nodes": [], "links": []}),
        }

    def generate_stream(self, topic: str, subject: str, mode: str = "concept"):
        """Generator that yields content chunks for SSE streaming."""
        prompt = topic_content_prompt(topic, subject, mode)
        messages = [nova.user_message(prompt)]

        buffer = ""
        json_started = False

        for chunk in nova.invoke_stream(messages, TOPIC_CONTENT_SYSTEM):
            if "```json" in chunk or json_started:
                json_started = True
                buffer += chunk
                continue
            yield chunk

        try:
            match = re.search(r'```json\s*([\s\S]+?)\s*```', buffer)
            if match:
                metadata = json.loads(match.group(1))
                yield f"\n\n__METADATA__{json.dumps(metadata)}__END_METADATA__"
        except Exception as e:
            logger.error("ContentAgent metadata parse error: %s", e)

    def generate_reels(self, topic: str, subject: str, card_count: int = 12) -> dict:
        """Generate knowledge reel cards for TikTok-style micro-learning."""
        prompt = reels_prompt(topic, subject, card_count)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            REELS_SYSTEM,
            max_tokens=3000,
            temperature=0.7,
        )

        try:
            cards = json.loads(raw)
        except json.JSONDecodeError:
            try:
                match = re.search(r'\[[\s\S]+\]', raw)
                if match:
                    cards = json.loads(match.group(0))
                else:
                    cards = []
            except Exception:
                cards = []

        return {"cards": cards, "topic": topic, "subject": subject}

    def _split_content_json(self, raw: str) -> tuple[str, dict]:
        """Separate markdown content from an embedded JSON block."""
        match = re.search(r'```json\s*([\s\S]+?)\s*```', raw)
        if match:
            content = raw[:match.start()].strip()
            try:
                metadata = json.loads(match.group(1))
            except json.JSONDecodeError:
                metadata = {}
            return content, metadata
        return raw.strip(), {}
