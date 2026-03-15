"""Vidya -- FastAPI Backend Server powered by Amazon Nova."""

import os
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from dotenv import load_dotenv
load_dotenv()

from routes.health import router as health_router
from routes.generate import router as generate_router
from routes.vision import router as vision_router

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Vidya AI Tutor -- Amazon Nova Backend starting...")
    logger.info("Model: %s", os.getenv("NOVA_MODEL", "nova-2-lite-v1"))
    logger.info("API: %s", os.getenv("NOVA_BASE_URL", "https://api.nova.amazon.com/v1"))
    yield
    logger.info("Vidya Backend shutting down.")


app = FastAPI(
    title="Vidya -- AI Knowledge Companion",
    description="Multi-agent educational platform powered by Amazon Nova",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(generate_router)
app.include_router(vision_router)

FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.isdir(FRONTEND_DIR):
    from fastapi.responses import FileResponse

    app.mount("/static", StaticFiles(directory=os.path.join(FRONTEND_DIR, "static")), name="static")

    @app.get("/")
    async def serve_frontend():
        return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,
        log_level="info",
    )
