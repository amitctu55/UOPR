from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["service"] == "upchar-api"


def test_login_mfa_and_me() -> None:
    login = client.post(
        "/api/auth/login",
        json={"email": "amelia.chen@email.com", "password": "demo-password", "role": "patient"},
    )
    assert login.status_code == 200
    assert login.json()["mfa_required"] is True

    mfa = client.post(
        "/api/auth/mfa",
        json={"email": "amelia.chen@email.com", "code": "123456"},
    )
    assert mfa.status_code == 200
    token = mfa.json()["access_token"]
    assert token

    me = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me.status_code == 200
    assert me.json()["role"] == "patient"


def test_appointments_and_patients() -> None:
    appointments = client.get("/api/appointments")
    assert appointments.status_code == 200
    assert len(appointments.json()) >= 1

    patients = client.get("/api/patients")
    assert patients.status_code == 200
    assert any(p["id"] == "p-1" for p in patients.json())


def test_billing_pay() -> None:
    invoices = client.get("/api/billing/invoices")
    assert invoices.status_code == 200
    due = next(i for i in invoices.json() if i["status"] != "Paid")
    paid = client.post(f"/api/billing/invoices/{due['id']}/pay")
    assert paid.status_code == 200
    assert paid.json()["status"] == "Paid"
