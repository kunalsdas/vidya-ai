"""All /api/generate/* endpoints."""

import json
import asyncio
import logging

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from models import (
    SubjectMapRequest,
    TopicContentRequest,
    DoubtRequest,
    PrerequisiteRequest,
    KnowledgeGraphRequest,
    ChaptersOnlyRequest,
    ChapterTopicsRequest,
    PYQRequest,
    ReelsRequest,
    BattleRequest,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/generate")


def _get_orchestrator():
    from agents import orchestrator
    return orchestrator


@router.post("/subject-map")
async def generate_subject_map(req: SubjectMapRequest):
    """Generate subject overview, chapter hierarchy, and knowledge graph via SubjectMapAgent."""
    if not req.subject.strip():
        raise HTTPException(400, "Subject cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().generate_subject_map(req.subject, req.book_name, req.resource_type)
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"SubjectMapAgent error: {str(e)}")


@router.post("/chapters")
async def generate_chapters_only(req: ChaptersOnlyRequest):
    """Generate subject overview and chapter list without topics to avoid token limits."""
    if not req.subject.strip():
        raise HTTPException(400, "Subject cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().generate_chapters_only(req.subject, req.book_name, req.resource_type)
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"ChaptersOnly error: {str(e)}")


@router.post("/chapter-topics")
async def generate_chapter_topics(req: ChapterTopicsRequest):
    """Generate topics for a single chapter on demand."""
    if not req.chapter_name.strip():
        raise HTTPException(400, "Chapter name cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().generate_chapter_topics(
                req.subject, req.chapter_name, req.chapter_description, req.book_name
            )
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"ChapterTopics error: {str(e)}")


@router.post("/topic-content")
async def generate_topic_content(req: TopicContentRequest):
    """Generate rich markdown explanation with prerequisites, doubts, and questions via ContentAgent."""
    if not req.topic.strip():
        raise HTTPException(400, "Topic cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().generate_topic_content(req.topic, req.subject, req.mode)
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"ContentAgent error: {str(e)}")


@router.post("/topic-content/stream")
async def generate_topic_content_stream(req: TopicContentRequest):
    """Stream content chunks as Server-Sent Events via ContentAgent."""
    async def generate():
        try:
            from agents import orchestrator
            loop = asyncio.get_event_loop()
            queue = asyncio.Queue()

            def _stream_thread():
                try:
                    for chunk in orchestrator.content.generate_stream(req.topic, req.subject, req.mode):
                        asyncio.run_coroutine_threadsafe(queue.put(chunk), loop)
                finally:
                    asyncio.run_coroutine_threadsafe(queue.put(None), loop)

            import threading
            thread = threading.Thread(target=_stream_thread, daemon=True)
            thread.start()

            while True:
                chunk = await queue.get()
                if chunk is None:
                    break
                yield f"data: {json.dumps({'text': chunk})}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.post("/doubt")
async def resolve_doubt(req: DoubtRequest):
    """Resolve a specific student doubt with expert explanation via DoubtAgent."""
    if not req.question.strip():
        raise HTTPException(400, "Question cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().resolve_doubt(req.question, req.topic)
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"DoubtAgent error: {str(e)}")


@router.post("/prerequisites")
async def get_prerequisites(req: PrerequisiteRequest):
    """Recursively drill down into prerequisite concepts via PrerequisiteAgent."""
    if not req.concept.strip():
        raise HTTPException(400, "Concept cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().drill_prerequisite(req.concept, req.subject)
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"PrerequisiteAgent error: {str(e)}")


@router.post("/knowledge-graph")
async def build_knowledge_graph(req: KnowledgeGraphRequest):
    """Build a concept relationship network for a subject via KnowledgeGraphAgent."""
    if not req.subject.strip():
        raise HTTPException(400, "Subject cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        graph = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().build_knowledge_graph(req.subject)
        )
        return graph
    except Exception as e:
        raise HTTPException(500, f"KnowledgeGraphAgent error: {str(e)}")


@router.post("/topic-reels")
async def generate_topic_reels(req: ReelsRequest):
    """Generate TikTok-style micro-learning cards for a topic."""
    if not req.topic.strip():
        raise HTTPException(400, "Topic cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().generate_reels(req.topic, req.subject, req.card_count)
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"ReelsAgent error: {str(e)}")


@router.post("/battle-questions")
async def generate_battle_questions(req: BattleRequest):
    """Generate competitive MCQ questions for Battle Mode via PYQAgent."""
    if not req.topic.strip():
        raise HTTPException(400, "Topic cannot be empty")

    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().generate_battle_questions(req.topic, req.subject, req.count)
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"BattleAgent error: {str(e)}")


@router.post("/pyq-analysis")
async def analyze_pyq(req: PYQRequest):
    """Analyse previous year question patterns for exam intelligence via PYQAgent."""
    try:
        loop = asyncio.get_event_loop()
        data = await loop.run_in_executor(
            None,
            lambda: _get_orchestrator().analyze_pyq(req.topic, req.exam)
        )
        return data
    except Exception as e:
        raise HTTPException(500, f"PYQAgent error: {str(e)}")
