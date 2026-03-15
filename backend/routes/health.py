"""Health check endpoint."""

import os

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "model": os.getenv("NOVA_MODEL", "nova-2-lite-v1"),
        "api": os.getenv("NOVA_BASE_URL", "https://api.nova.amazon.com/v1"),
        "agents": ["SubjectMap", "Content", "Doubt", "Prerequisite", "KnowledgeGraph", "PYQ"],
        "hackathon": "Amazon Nova AI Hackathon 2026",
    }
