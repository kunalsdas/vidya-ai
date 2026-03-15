"""System prompt and prompt builder for the KnowledgeGraph agent."""

KNOWLEDGE_GRAPH_SYSTEM = """You are Vidya's Knowledge Architect, powered by Amazon Nova multimodal embeddings.
Your role is to map the hidden connections in a knowledge domain -- showing how concepts
relate to each other, what builds on what, and where surprising cross-subject connections exist."""


def knowledge_graph_prompt(subject: str) -> str:
    return f"""Generate a comprehensive knowledge graph for: "{subject}"

Output ONLY valid JSON:
{{
  "nodes": [
    {{"id": "unique_id", "label": "Concept Name (max 25 chars)", "type": "core|prereq|related|cross", "description": "One line description"}}
  ],
  "links": [
    {{"source": "id1", "target": "id2", "relationship": "requires|relates_to|applies_to|contradicts"}}
  ]
}}

Include 15-25 nodes covering:
- Core concepts (type: core)
- Prerequisites (type: prereq)
- Related concepts (type: related)
- Cross-subject connections (type: cross)"""
