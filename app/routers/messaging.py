from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.data import MESSAGES, MessageThread

router = APIRouter(prefix="/messages", tags=["messages"])


class SendMessage(BaseModel):
    body: str = Field(min_length=1)


@router.get("", response_model=list[MessageThread])
def list_threads() -> list[MessageThread]:
    return MESSAGES


@router.post("/{thread_id}", response_model=MessageThread)
def send_message(thread_id: str, payload: SendMessage) -> MessageThread:
    for thread in MESSAGES:
        if thread.id == thread_id:
            thread.messages.append(
                {
                    "id": f"t-{len(thread.messages) + 1}",
                    "sender": "You",
                    "body": payload.body,
                    "time": "Just now",
                }
            )
            thread.preview = payload.body
            thread.unread = False
            return thread
    raise HTTPException(status_code=404, detail="Thread not found.")
