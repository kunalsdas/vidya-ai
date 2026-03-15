"""SubjectMapAgent -- analyses subjects and produces structured learning maps."""

import json
import logging

from nova_client import nova
from prompts.subject_map import (
    SUBJECT_MAP_SYSTEM,
    subject_map_prompt,
    chapters_only_prompt,
    chapter_topics_prompt,
)
from agents._utils import _extract_json_block, _safe_invoke

logger = logging.getLogger(__name__)


class SubjectMapAgent:
    """Analyses any academic subject and produces a structured learning map."""

    def generate(self, subject: str, book_name: str = None, resource_type: str = None) -> dict:
        prompt = subject_map_prompt(subject, book_name, resource_type)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            SUBJECT_MAP_SYSTEM,
            max_tokens=8000,
            temperature=0.4,
        )

        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            try:
                data = _extract_json_block(raw)
            except Exception as e:
                logger.error("SubjectMapAgent JSON parse error: %s", e)
                data = self._fallback_map(subject)

        data.setdefault("overview", f"Comprehensive guide to {subject}")
        data.setdefault("chapters", [])
        data.setdefault("graph", {"nodes": [], "links": []})
        return data

    def generate_chapters_only(self, subject: str, book_name: str = None, resource_type: str = None) -> dict:
        """Generate chapters WITHOUT topics to avoid token limits."""
        prompt = chapters_only_prompt(subject, book_name, resource_type)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            SUBJECT_MAP_SYSTEM,
            max_tokens=4000,
            temperature=0.4,
        )

        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            try:
                data = _extract_json_block(raw)
            except Exception as e:
                logger.error("SubjectMapAgent ChaptersOnly JSON parse error: %s", e)
                data = self._fallback_map(subject)

        data.setdefault("overview", f"Comprehensive guide to {subject}")
        data.setdefault("chapters", [])
        data.setdefault("graph", {"nodes": [], "links": []})
        for ch in data["chapters"]:
            ch.setdefault("topics", [])
        return data

    def generate_chapter_topics(self, subject: str, chapter_name: str, chapter_desc: str = "", book_name: str = None) -> dict:
        """Generate topics for a single chapter."""
        prompt = chapter_topics_prompt(subject, chapter_name, chapter_desc, book_name)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            SUBJECT_MAP_SYSTEM,
            max_tokens=2000,
            temperature=0.4,
        )

        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            try:
                data = _extract_json_block(raw)
            except Exception:
                data = {"topics": []}

        data.setdefault("topics", [])
        return data

    def _fallback_map(self, subject: str) -> dict:
        return {
            "overview": f"**{subject}** -- a comprehensive knowledge domain. Connect to Amazon Nova for the full AI-generated subject map.",
            "chapters": [
                {
                    "name": "Introduction",
                    "description": "Foundational concepts and overview",
                    "topics": [{"name": "Getting Started", "examFreq": "** Medium", "difficulty": "Beginner", "readTime": "10 min"}]
                }
            ],
            "graph": {
                "nodes": [{"id": "main", "label": subject[:25], "type": "core"}],
                "links": []
            }
        }
