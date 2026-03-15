"""Shared utility functions for Vidya agents."""

import json
import logging
import re

from nova_client import nova

logger = logging.getLogger(__name__)


def _extract_json_block(text: str) -> dict:
    """Extract the first JSON object or fenced ```json``` block from text."""
    match = re.search(r'```json\s*([\s\S]+?)\s*```', text)
    if match:
        return json.loads(match.group(1))

    match = re.search(r'\{[\s\S]+\}', text)
    if match:
        return json.loads(match.group(0))

    raise ValueError("No JSON found in response")


def _safe_invoke(messages, system_prompt, max_tokens=4096, temperature=0.7, fallback=None):
    """Invoke Nova with error handling and optional fallback."""
    try:
        return nova.invoke(messages, system_prompt, max_tokens=max_tokens, temperature=temperature)
    except Exception as e:
        logger.error("Nova invoke error: %s", e)
        if fallback:
            return fallback
        raise
