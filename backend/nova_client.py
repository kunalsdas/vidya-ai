"""
Amazon Nova Client
Direct Nova API (OpenAI-compatible interface).
Set NOVA_API_KEY in your .env file.
"""

import os
import json
import requests
from typing import Generator, Optional

MODEL_IDS = {
    "lite":    "nova-2-lite-v1",
    "pro":     "nova-2-pro-v1",
    "micro":   "nova-micro-v1",
    "premier": "nova-premier-v1",
}

DEFAULT_MODEL = MODEL_IDS["lite"]

NOVA_BASE_URL = os.getenv("NOVA_BASE_URL", "https://api.nova.amazon.com/v1")


class NovaClient:
    """Amazon Nova direct API client."""

    def __init__(self):
        self.api_key  = os.getenv("NOVA_API_KEY") or os.getenv("AWS_ACCESS_KEY_ID")
        self.base_url = NOVA_BASE_URL.rstrip("/")
        self.headers  = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type":  "application/json",
        }

    def invoke(
        self,
        messages: list[dict],
        system_prompt: Optional[str] = None,
        model: str = DEFAULT_MODEL,
        max_tokens: int = 4096,
        temperature: float = 0.7,
    ) -> str:
        """Non-streaming invocation. Returns the complete response text."""
        payload = self._build_payload(messages, system_prompt, model, max_tokens, temperature)
        resp = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self.headers,
            json=payload,
            timeout=360,
        )
        if not resp.ok:
            try:
                err_body = resp.json()
                err_msg = err_body.get("error", {}).get("message", resp.text[:400])
            except Exception:
                err_msg = resp.text[:400]
            raise RuntimeError(f"Nova API {resp.status_code}: {err_msg}")
        data = resp.json()
        return data["choices"][0]["message"]["content"]

    def invoke_stream(
        self,
        messages: list[dict],
        system_prompt: Optional[str] = None,
        model: str = DEFAULT_MODEL,
        max_tokens: int = 4096,
        temperature: float = 0.7,
    ) -> Generator[str, None, None]:
        """Streaming invocation. Yields text chunks."""
        payload = self._build_payload(messages, system_prompt, model, max_tokens, temperature, stream=True)
        with requests.post(
            f"{self.base_url}/chat/completions",
            headers=self.headers,
            json=payload,
            stream=True,
            timeout=360,
        ) as resp:
            resp.raise_for_status()
            for line in resp.iter_lines():
                if line:
                    line = line.decode("utf-8")
                    if line.startswith("data: "):
                        line = line[6:]
                    if line == "[DONE]":
                        break
                    try:
                        data = json.loads(line)
                        delta = data["choices"][0].get("delta", {})
                        text  = delta.get("content", "")
                        if text:
                            yield text
                    except (json.JSONDecodeError, KeyError):
                        continue

    def embed(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings via the Nova embeddings endpoint."""
        try:
            resp = requests.post(
                f"{self.base_url}/embeddings",
                headers=self.headers,
                json={"model": "nova-embed-v1", "input": texts},
                timeout=30,
            )
            resp.raise_for_status()
            data = resp.json()
            return [item["embedding"] for item in data["data"]]
        except Exception:
            return [[0.0] * 256 for _ in texts]

    def _build_payload(self, messages, system_prompt, model, max_tokens, temperature, stream=False):
        oai_messages = []
        if system_prompt:
            oai_messages.append({"role": "system", "content": system_prompt})
        for m in messages:
            role    = m.get("role", "user")
            content = m.get("content", "")
            if isinstance(content, list):
                content = " ".join(c.get("text", "") for c in content)
            oai_messages.append({"role": role, "content": content})

        return {
            "model":       model,
            "messages":    oai_messages,
            "max_tokens":  max_tokens,
            "temperature": temperature,
            "stream":      stream,
        }

    def invoke_vision(
        self,
        image_base64: str,
        image_mime: str,
        prompt: str,
        system_prompt: str = None,
        model: str = None,
        max_tokens: int = 4096,
    ) -> str:
        """Send an image + text prompt to Nova's vision endpoint."""
        model = model or MODEL_IDS["lite"]
        messages_payload = []
        if system_prompt:
            messages_payload.append({"role": "system", "content": system_prompt})
        messages_payload.append({
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt or "Analyze this image and explain its educational content in detail."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:{image_mime};base64,{image_base64}"
                    }
                }
            ]
        })
        payload = {
            "model": model,
            "messages": messages_payload,
            "max_tokens": max_tokens,
            "temperature": 0.5,
        }
        resp = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self.headers,
            json=payload,
            timeout=360,
        )
        if not resp.ok:
            try:
                err_body = resp.json()
                err_msg = err_body.get("error", {}).get("message", resp.text[:400])
            except Exception:
                err_msg = resp.text[:400]
            raise RuntimeError(f"Nova API {resp.status_code}: {err_msg}")
        return resp.json()["choices"][0]["message"]["content"]

    @staticmethod
    def user_message(text: str) -> dict:
        return {"role": "user", "content": [{"text": text}]}

    @staticmethod
    def assistant_message(text: str) -> dict:
        return {"role": "assistant", "content": [{"text": text}]}


nova = NovaClient()
