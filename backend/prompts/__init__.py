"""Vidya prompt definitions, re-exported for backward compatibility."""

from prompts.known_books import KNOWN_BOOK_CHAPTERS, _get_known_chapters
from prompts.subject_map import (
    SUBJECT_MAP_SYSTEM,
    subject_map_prompt,
    chapters_only_prompt,
    chapter_topics_prompt,
)
from prompts.content import TOPIC_CONTENT_SYSTEM, topic_content_prompt
from prompts.doubt import DOUBT_SYSTEM, doubt_prompt
from prompts.prerequisite import PREREQUISITE_SYSTEM, prerequisite_prompt
from prompts.knowledge_graph import KNOWLEDGE_GRAPH_SYSTEM, knowledge_graph_prompt
from prompts.engagement import (
    REELS_SYSTEM,
    reels_prompt,
    BATTLE_SYSTEM,
    battle_questions_prompt,
    NUDGE_SYSTEM,
    nudge_prompt,
)

__all__ = [
    "KNOWN_BOOK_CHAPTERS",
    "_get_known_chapters",
    "SUBJECT_MAP_SYSTEM",
    "subject_map_prompt",
    "chapters_only_prompt",
    "chapter_topics_prompt",
    "TOPIC_CONTENT_SYSTEM",
    "topic_content_prompt",
    "DOUBT_SYSTEM",
    "doubt_prompt",
    "PREREQUISITE_SYSTEM",
    "prerequisite_prompt",
    "KNOWLEDGE_GRAPH_SYSTEM",
    "knowledge_graph_prompt",
    "REELS_SYSTEM",
    "reels_prompt",
    "BATTLE_SYSTEM",
    "battle_questions_prompt",
    "NUDGE_SYSTEM",
    "nudge_prompt",
]
