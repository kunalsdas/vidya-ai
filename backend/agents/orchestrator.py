"""VidyaOrchestrator -- coordinates all Vidya agents."""

from agents.subject_map import SubjectMapAgent
from agents.content import ContentAgent
from agents.doubt import DoubtAgent
from agents.prerequisite import PrerequisiteAgent
from agents.knowledge_graph import KnowledgeGraphAgent
from agents.pyq import PYQAgent


class VidyaOrchestrator:
    """Coordinates all Vidya agents and routes requests to the appropriate specialist."""

    def __init__(self):
        self.subject_map  = SubjectMapAgent()
        self.content      = ContentAgent()
        self.doubt        = DoubtAgent()
        self.prerequisite = PrerequisiteAgent()
        self.graph        = KnowledgeGraphAgent()
        self.pyq          = PYQAgent()

    def generate_subject_map(self, subject: str, book_name: str = None, resource_type: str = None) -> dict:
        return self.subject_map.generate(subject, book_name, resource_type)

    def generate_chapters_only(self, subject: str, book_name: str = None, resource_type: str = None) -> dict:
        return self.subject_map.generate_chapters_only(subject, book_name, resource_type)

    def generate_chapter_topics(self, subject: str, chapter_name: str, chapter_desc: str = "", book_name: str = None) -> dict:
        return self.subject_map.generate_chapter_topics(subject, chapter_name, chapter_desc, book_name)

    def generate_topic_content(self, topic: str, subject: str, mode: str = "concept") -> dict:
        return self.content.generate(topic, subject, mode)

    def resolve_doubt(self, question: str, topic: str) -> dict:
        return self.doubt.resolve(question, topic)

    def drill_prerequisite(self, concept: str, subject: str) -> dict:
        return self.prerequisite.explain(concept, subject)

    def build_knowledge_graph(self, subject: str) -> dict:
        return self.graph.build(subject)

    def analyze_pyq(self, topic: str, exam: str = "UPSC") -> dict:
        return self.pyq.analyze(topic, exam)

    def generate_reels(self, topic: str, subject: str, card_count: int = 12) -> dict:
        return self.content.generate_reels(topic, subject, card_count)

    def generate_battle_questions(self, topic: str, subject: str, count: int = 5) -> dict:
        return self.pyq.generate_battle_questions(topic, subject, count)


orchestrator = VidyaOrchestrator()
