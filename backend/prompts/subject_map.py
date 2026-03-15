"""System prompt and prompt builders for the SubjectMap agent."""

from prompts.known_books import _get_known_chapters

SUBJECT_MAP_SYSTEM = """You are Vidya's Subject Architecture Agent, powered by Amazon Nova.
Your role: analyse any academic subject or exam preparation topic and generate a comprehensive,
pedagogically-sound learning map that maximises exam performance.

You have deep expertise in:
- UPSC Civil Services (Prelims + Mains + Interview)
- JEE Main & Advanced (Physics, Chemistry, Mathematics)
- NEET UG (Biology, Physics, Chemistry)
- University-level CS (Algorithms, Bioinformatics, ML, Data Science)
- Any interdisciplinary academic domain

Output philosophy:
- Structure for CONCEPTUAL BUILD-UP, not alphabetical order
- Prioritise topics by exam frequency AND conceptual importance
- Reveal hidden connections between chapters
- Write descriptions that make students excited to learn

CRITICAL: Always respond with valid JSON in the exact format specified."""


def subject_map_prompt(subject: str, book_name: str = None, resource_type: str = None) -> str:
    known_chapters = _get_known_chapters(book_name or "", subject)

    book_context = ""
    if book_name and resource_type == "book":
        if known_chapters:
            book_context = f"""
CRITICAL: You have been provided the EXACT chapter structure of "{book_name}" below.
Use THESE EXACT chapters -- do not invent or skip any:

{known_chapters}

For each chapter listed above:
- Generate 5-12 specific, detailed topics that appear within that chapter
- Topics must be real concepts from that chapter, not generic placeholders
- Each topic name should be specific enough that a student knows exactly what to study"""
        else:
            book_context = f"""
CRITICAL: Generate the complete chapter structure of "{book_name}".
- Use the actual chapter names as they appear in this book
- Include EVERY SINGLE chapter -- do not skip or merge any
- Add 5-12 specific topics per chapter (real subtopics from that chapter)
- Mirror the book's pedagogical sequence exactly
- This book typically has 20-40+ chapters -- generate ALL of them without stopping early"""
    elif book_name and resource_type == "course":
        if known_chapters:
            book_context = f"""
CRITICAL: You have been provided the EXACT module structure of the course "{book_name}" below.
Use THESE EXACT modules -- do not invent or skip any:

{known_chapters}

For each module listed above:
- Generate 4-10 specific, detailed topics/lectures within that module
- Topics must be real concepts taught in that module"""
        else:
            book_context = f"""
CRITICAL: Generate the complete module structure of course "{book_name}".
- Use actual module/week names as they appear in this course
- Include ALL modules/weeks/lectures -- do not skip any
- Add 4-10 specific topics per module
- This course typically has 10-20+ modules -- generate ALL of them"""
    else:
        book_context = """
CRITICAL: Generate ALL chapters exhaustively for this subject/exam.
- A full subject typically has 15-25+ chapters -- generate ALL of them
- Do NOT stop early. Cover the complete syllabus from start to finish
- Include every major unit, part, and chapter a standard textbook would have
- Each chapter must have 5-10 specific, real topics (not generic placeholders)"""

    return f"""Analyse the subject: "{subject}"
{book_context}

Generate a complete learning map. Respond with ONLY valid JSON, no markdown:
{{
  "overview": "2-3 sentence compelling overview with exam statistics and what makes this subject unique (use markdown bold for emphasis)",
  "chapters": [
    {{
      "name": "Chapter Name",
      "description": "What this chapter covers and why it matters (1-2 sentences)",
      "topics": [
        {{
          "name": "Topic Name",
          "examFreq": "*** Very High / ** Medium / * Low",
          "difficulty": "Beginner / Intermediate / Advanced / Expert",
          "readTime": "X min read"
        }}
      ]
    }}
  ],
  "graph": {{
    "nodes": [
      {{"id": "unique_id", "label": "Concept Name", "type": "core|prereq|related|cross"}}
    ],
    "links": [
      {{"source": "id1", "target": "id2"}}
    ]
  }}
}}

Rules:
- MINIMUM 12 chapters -- a real subject has 15-25+ chapters, generate them ALL
- Do NOT stop generating chapters early. Exhaust the entire syllabus
- Each chapter must have 3-8 topics listed (all real topics, not placeholders)
- Graph: 10-20 nodes showing concept relationships
- Node types: core=main topic, prereq=prerequisite, related=same subject, cross=other subjects
- examFreq and difficulty must use the exact formats shown
- Chapter names must be specific and real, never generic like "Chapter 1" or "Introduction" """


def chapters_only_prompt(subject: str, book_name: str = None, resource_type: str = None) -> str:
    """Generate chapters WITHOUT topics to avoid token limits."""
    known_chapters = _get_known_chapters(book_name or "", subject)

    book_context = ""
    if book_name and known_chapters:
        book_context = f"""
CRITICAL: You have been provided the EXACT chapter structure of "{book_name}" below.
Use THESE EXACT chapters -- do not invent or skip any:

{known_chapters}

Generate ONLY the chapter names and descriptions from this list."""
    elif book_name:
        book_context = f"""
CRITICAL: Generate the complete chapter structure of "{book_name}".
Use the actual chapter names as they appear in this book.
Include EVERY SINGLE chapter -- do not skip or merge any."""
    else:
        book_context = """
CRITICAL: Generate ALL chapters exhaustively for this subject/exam.
A full subject typically has 15-25+ chapters -- generate ALL of them."""

    return f"""Analyse the subject: "{subject}"
{book_context}

Generate ONLY the chapter list (NO topics). Respond with ONLY valid JSON, no markdown:
{{
  "overview": "2-3 sentence compelling overview with exam statistics (use markdown bold for emphasis)",
  "chapters": [
    {{
      "name": "Chapter Name",
      "description": "What this chapter covers and why it matters (1-2 sentences)"
    }}
  ],
  "graph": {{
    "nodes": [
      {{"id": "unique_id", "label": "Concept Name", "type": "core|prereq|related|cross"}}
    ],
    "links": [
      {{"source": "id1", "target": "id2"}}
    ]
  }}
}}

Rules:
- MINIMUM 12 chapters -- generate ALL chapters for the complete syllabus
- Do NOT include topics -- only chapter names and descriptions
- Graph: 10-20 nodes showing concept relationships
- Node types: core=main topic, prereq=prerequisite, related=same subject, cross=other subjects
- Chapter names must be specific and real, never generic like "Chapter 1" """


def chapter_topics_prompt(subject: str, chapter_name: str, chapter_desc: str = "", book_name: str = None) -> str:
    """Generate topics for a single chapter."""
    book_ctx = f' from "{book_name}"' if book_name else ""
    desc_ctx = f"\nChapter description: {chapter_desc}" if chapter_desc else ""

    return f"""Subject: "{subject}"
Chapter: "{chapter_name}"{book_ctx}{desc_ctx}

Generate ALL topics/subtopics that belong to this chapter. Respond with ONLY valid JSON:
{{
  "topics": [
    {{
      "name": "Specific Topic Name",
      "examFreq": "*** Very High / ** Medium / * Low",
      "difficulty": "Beginner / Intermediate / Advanced / Expert",
      "readTime": "X min read"
    }}
  ]
}}

Rules:
- Generate 5-12 specific, real topics (not placeholders)
- Each topic name must be specific enough that a student knows exactly what to study
- Topics should follow a logical learning sequence
- Use the exact format for examFreq, difficulty, and readTime shown above"""
