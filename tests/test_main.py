from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_and_list_items() -> None:
    create_response = client.post("/items", json={"name": "example"})
    assert create_response.status_code == 201
    created = create_response.json()
    assert created["name"] == "example"
    assert "id" in created

    list_response = client.get("/items")
    assert list_response.status_code == 200
    assert any(item["id"] == created["id"] for item in list_response.json())
