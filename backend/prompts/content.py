"""System prompt and prompt builder for the Content agent."""

TOPIC_CONTENT_SYSTEM = """You are Vidya's Master Content Generator, powered by Amazon Nova.
You are the best teacher in the world -- combining the clarity of Feynman, the depth of Knuth,
and the exam-awareness of the most successful coaching institutes.

Your explanations:
1. Start with intuition and motivation -- WHY does this exist?
2. Build from first principles -- never assume knowledge, always explain
3. Use vivid examples, analogies, and thought experiments
4. Include proper mathematical notation in LaTeX when needed
5. Highlight EXAM-CRITICAL information explicitly
6. Connect to related concepts and real-world applications

Output format: Rich Markdown with LaTeX math (use $...$ for inline, $$...$$ for display).
Structure: Use headings (##, ###), bold key terms, tables where useful, blockquotes for definitions."""


def topic_content_prompt(topic: str, subject: str, mode: str = "concept") -> str:
    mode_instructions = {
        "concept": "Write an ULTRA-COMPREHENSIVE textbook-level explanation (2500-3500 words). Cover: intuition, formal definition, derivations/proofs, worked examples, edge cases, historical context, exam-critical insights, and cross-connections. Leave nothing important out.",
        "revision": "Write ultra-compressed revision notes (400-600 words). Bullet points, key formulas, mnemonics, memory tricks, and a quick-reference table.",
        "exam":     "Write exam-focused explanation (1000-1500 words). Lead with examiner expectations, use actual past-question examples, common traps, and model answers.",
        "visual":   "Write with heavy emphasis on analogies, mental models, step-by-step visual descriptions, and concrete real-world examples (800-1200 words)."
    }
    instruction = mode_instructions.get(mode, mode_instructions["concept"])

    return f"""Topic: "{topic}"
Subject: "{subject}"
Mode: {mode.upper()}

{instruction}

After the main content, output a JSON block (wrapped in ```json ... ```) with this structure:
{{
  "prerequisites": [
    {{"name": "Concept Name", "type": "Core Prereq|Context|Related", "description": "Why needed"}}
  ],
  "related": [
    {{"name": "Topic Name", "subject": "Subject it belongs to"}}
  ],
  "doubts": [
    {{"question": "Specific confusion students commonly have (15 words max)", "answer": "Clear explanation in markdown (100-200 words)"}}
  ],
  "questions": [
    {{
      "type": "MCQ|Short Answer|Long Answer|Numerical",
      "question": "Exam-quality question",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Detailed answer explanation in markdown"
    }}
  ],
  "graph": {{
    "nodes": [{{"id": "id", "label": "Label", "type": "core|prereq|related|cross"}}],
    "links": [{{"source": "id1", "target": "id2"}}]
  }},
  "curiosity_hooks": [
    {{"teaser": "Surprising hook that creates an information gap ending with ?", "target_topic": "Related Topic Name"}}
  ]
}}

Rules for curiosity_hooks:
- Generate 2-3 hooks that use information gap theory
- Each teaser should reveal something surprising that makes the student NEED to learn the next topic
- target_topic must be a real related topic they should learn next
- The teaser should end with a question or "..." to create tension

Rules for doubts:
- Generate 5-7 SPECIFIC doubts students actually have (not generic ones)
- Questions should be the EXACT phrasing a confused student would use
- Make them about specific terms, formulas, distinctions, or applications
- Answers should be crisp, clear, and confidence-building

Rules for questions:
- 2-4 questions, mixed types
- MCQ: 4 options, indicate correct answer index (0-based)
- Short/Long Answer: omit options and correct, include detailed explanation
- Match actual exam difficulty and style (UPSC/JEE/NEET/academic as appropriate)"""
