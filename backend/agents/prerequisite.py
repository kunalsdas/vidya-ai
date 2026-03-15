"""PrerequisiteAgent -- recursive drill-down into prerequisite concepts."""

import json
import logging
import re

from nova_client import nova
from prompts.prerequisite import PREREQUISITE_SYSTEM, prerequisite_prompt
from agents._utils import _safe_invoke

logger = logging.getLogger(__name__)


class PrerequisiteAgent:
    """Enables recursive drill-down into prerequisite concepts."""

    def explain(self, concept: str, subject: str) -> dict:
        prompt = prerequisite_prompt(concept, subject)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            PREREQUISITE_SYSTEM,
            max_tokens=2000,
            temperature=0.7,
        )

        content, metadata = self._split(raw)
        return {
            "concept":       concept,
            "content":       content,
            "prerequisites": metadata.get("prerequisites", []),
        }

    def _split(self, raw: str) -> tuple[str, dict]:
        match = re.search(r'```json\s*([\s\S]+?)\s*```', raw)
        if match:
            content  = raw[:match.start()].strip()
            try:
                metadata = json.loads(match.group(1))
            except json.JSONDecodeError:
                metadata = {}
            return content, metadata
        return raw.strip(), {}
