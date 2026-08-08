from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="UOPR API")

_items: list[dict[str, str]] = []
_next_id = 1


class ItemCreate(BaseModel):
    name: str


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/items")
def list_items() -> list[dict[str, str]]:
    return _items


@app.post("/items", status_code=201)
def create_item(payload: ItemCreate) -> dict[str, str]:
    global _next_id
    item = {"id": str(_next_id), "name": payload.name}
    _next_id += 1
    _items.append(item)
    return item
