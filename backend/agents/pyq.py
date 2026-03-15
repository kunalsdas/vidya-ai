"""PYQAgent -- previous year question analysis and battle question generation."""

import json
import logging
import re

from nova_client import nova
from prompts.engagement import BATTLE_SYSTEM, battle_questions_prompt
from agents._utils import _safe_invoke

logger = logging.getLogger(__name__)


class PYQAgent:
    """Analyses previous year question patterns to predict exam focus areas."""

    def analyze(self, topic: str, exam: str = "UPSC") -> dict:
        prompt = f"""Analyse how "{topic}" is tested in {exam} examinations.

Based on your knowledge of {exam} PYQs, provide:
1. Frequency of questions on this topic (High/Medium/Low)
2. Most commonly tested sub-concepts
3. Question types used (MCQ/Short/Long/Essay)
4. Predicted question for next exam
5. Common mistakes to avoid

Format as structured markdown."""

        messages = [nova.user_message(prompt)]
        raw = _safe_invoke(
            messages,
            f"You are an expert {exam} question pattern analyst with 20+ years of experience.",
            max_tokens=1000,
        )
        return {"analysis": raw.strip()}

    def generate_battle_questions(self, topic: str, subject: str, count: int = 5) -> dict:
        """Generate battle mode MCQ questions."""
        prompt = battle_questions_prompt(topic, subject, count)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            BATTLE_SYSTEM,
            max_tokens=2000,
            temperature=0.6,
        )

        try:
            questions = json.loads(raw)
        except json.JSONDecodeError:
            try:
                match = re.search(r'\[[\s\S]+\]', raw)
                if match:
                    questions = json.loads(match.group(0))
                else:
                    questions = []
            except Exception:
                questions = []

        return {"questions": questions}
