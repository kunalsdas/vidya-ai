"""Vision analysis endpoint for educational image processing."""

import logging

from fastapi import APIRouter, HTTPException

from models import ImageAnalysisRequest

logger = logging.getLogger(__name__)

router = APIRouter()

VISION_SYSTEM_PROMPT = """You are Vidya's Vision Analysis Agent powered by Amazon Nova.
When given an image of educational content (textbook page, notes, diagram, question paper, PDF page),
you extract and explain everything in it with maximum educational value.

Your response must be rich Markdown with:
- Clear heading for what the image shows
- All text content accurately transcribed
- Mathematical formulas in LaTeX ($...$ inline, $$...$$ block)
- Diagrams/figures described in detail
- Key concepts highlighted in bold
- Explanations of any concepts shown
- Connections to the broader subject
- Any questions or problems in the image fully solved"""


@router.post("/api/analyze/image")
async def analyze_image(req: ImageAnalysisRequest):
    """Analyse an image of educational content and return structured markdown."""
    from nova_client import nova
    custom_q = req.prompt.strip() if req.prompt else ""

    user_prompt = custom_q if custom_q else (
        "Analyse this educational content image completely. "
        "Transcribe all text, explain all concepts, solve all problems shown, "
        "describe all diagrams, and render all math in LaTeX. "
        "Provide a thorough educational breakdown in rich Markdown."
    )

    try:
        result = nova.invoke_vision(
            image_base64=req.image_base64,
            image_mime=req.image_mime or "image/png",
            prompt=user_prompt,
            system_prompt=VISION_SYSTEM_PROMPT,
            max_tokens=4096,
        )
        return {"content": result, "status": "ok"}
    except Exception as e:
        raise HTTPException(500, f"Vision analysis error: {str(e)}")
