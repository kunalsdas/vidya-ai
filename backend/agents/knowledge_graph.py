"""KnowledgeGraphAgent -- builds subject knowledge graphs."""

import json
import logging

from nova_client import nova
from prompts.knowledge_graph import knowledge_graph_prompt
from agents._utils import _extract_json_block, _safe_invoke

logger = logging.getLogger(__name__)


class KnowledgeGraphAgent:
    """Builds subject knowledge graphs using Nova and semantic embeddings."""

    def build(self, subject: str) -> dict:
        prompt = knowledge_graph_prompt(subject)
        messages = [nova.user_message(prompt)]

        raw = _safe_invoke(
            messages,
            "You are a knowledge graph architect. Output ONLY valid JSON.",
            max_tokens=2000,
            temperature=0.4,
        )

        try:
            graph = json.loads(raw)
        except json.JSONDecodeError:
            try:
                graph = _extract_json_block(raw)
            except Exception:
                graph = {"nodes": [], "links": []}

        graph.setdefault("nodes", [])
        graph.setdefault("links", [])
        return graph

    def semantic_search(self, query: str, concept_list: list[str]) -> list[dict]:
        """Find semantically similar concepts using Nova embeddings."""
        try:
            all_texts = [query] + concept_list
            embeddings = nova.embed(all_texts)
            query_emb = embeddings[0]
            concept_embs = embeddings[1:]

            def cosine_sim(a, b):
                dot = sum(x * y for x, y in zip(a, b))
                na  = sum(x**2 for x in a) ** 0.5
                nb  = sum(x**2 for x in b) ** 0.5
                return dot / (na * nb) if na and nb else 0

            scored = [
                {"concept": c, "score": cosine_sim(query_emb, e)}
                for c, e in zip(concept_list, concept_embs)
            ]
            return sorted(scored, key=lambda x: x["score"], reverse=True)[:5]
        except Exception as e:
            logger.error("KnowledgeGraphAgent embedding error: %s", e)
            return []
