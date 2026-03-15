"""Pydantic request models for the Vidya API."""

from typing import Optional
from pydantic import BaseModel


class SubjectMapRequest(BaseModel):
    subject: str
    book_name: Optional[str] = None
    resource_type: Optional[str] = None


class TopicContentRequest(BaseModel):
    subject: str
    topic: str
    mode: Optional[str] = "concept"


class DoubtRequest(BaseModel):
    topic: str
    question: str


class PrerequisiteRequest(BaseModel):
    concept: str
    subject: Optional[str] = ""


class KnowledgeGraphRequest(BaseModel):
    subject: str


class ChaptersOnlyRequest(BaseModel):
    subject: str
    book_name: Optional[str] = None
    resource_type: Optional[str] = None


class ChapterTopicsRequest(BaseModel):
    subject: str
    chapter_name: str
    chapter_description: Optional[str] = ""
    book_name: Optional[str] = None


class PYQRequest(BaseModel):
    topic: str
    exam: Optional[str] = "UPSC"


class ReelsRequest(BaseModel):
    topic: str
    subject: str
    card_count: Optional[int] = 12


class BattleRequest(BaseModel):
    topic: str
    subject: str
    count: Optional[int] = 5


class ImageAnalysisRequest(BaseModel):
    image_base64: str
    image_mime: Optional[str] = "image/png"
    prompt: Optional[str] = ""
