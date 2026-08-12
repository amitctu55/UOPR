"""UPCHAR API — in-memory demo data and domain models."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Literal

from pydantic import BaseModel, Field

Role = Literal["patient", "doctor", "hospital", "admin"]


class UserPublic(BaseModel):
    id: str
    name: str
    email: str
    role: Role
    title: str | None = None
    organization: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic
    mfa_required: bool = False


class LoginRequest(BaseModel):
    email: str
    password: str = Field(min_length=6)
    role: Role | None = None


class MfaRequest(BaseModel):
    email: str
    code: str = Field(min_length=6, max_length=6)


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2)
    email: str
    password: str = Field(min_length=8)
    role: Role = "patient"


class Appointment(BaseModel):
    id: str
    patient: str
    doctor: str
    specialty: str
    type: str
    status: str
    start: datetime
    end: datetime
    location: str


class AppointmentCreate(BaseModel):
    patient: str
    doctor: str = "Dr. Marcus Webb"
    specialty: str = "Primary Care"
    type: str = "Video"
    start: datetime
    duration_minutes: int = 30
    location: str = "Telemedicine Room A"


class Patient(BaseModel):
    id: str
    name: str
    age: int
    gender: str
    blood_type: str
    allergies: list[str]
    conditions: list[str]
    medications: list[str]
    last_visit: str
    mrn: str


class Invoice(BaseModel):
    id: str
    patient: str
    date: str
    amount: float
    status: str
    insurer: str
    description: str


class MessageThread(BaseModel):
    id: str
    from_name: str
    preview: str
    time: str
    unread: bool
    messages: list[dict[str, str]]


class ServiceStatus(BaseModel):
    name: str
    status: str
    latency_ms: int
    uptime: str


class Alert(BaseModel):
    id: str
    severity: str
    title: str
    detail: str
    time: str


NOW = datetime(2026, 8, 8, 12, 0, tzinfo=timezone.utc)

USERS: dict[str, UserPublic] = {
    "amelia.chen@email.com": UserPublic(
        id="u-patient",
        name="Amelia Chen",
        email="amelia.chen@email.com",
        role="patient",
        organization="Self",
    ),
    "m.webb@upchar.care": UserPublic(
        id="u-doctor",
        name="Dr. Marcus Webb",
        email="m.webb@upchar.care",
        role="doctor",
        title="Cardiologist",
        organization="Northshore Medical",
    ),
    "p.nair@northshore.care": UserPublic(
        id="u-hospital",
        name="Priya Nair",
        email="p.nair@northshore.care",
        role="hospital",
        title="Hospital Administrator",
        organization="Northshore Medical",
    ),
    "jordan.hale@upchar.io": UserPublic(
        id="u-admin",
        name="Jordan Hale",
        email="jordan.hale@upchar.io",
        role="admin",
        title="Platform Admin",
        organization="UPCHAR",
    ),
}

PENDING_MFA: dict[str, UserPublic] = {}
SESSIONS: dict[str, UserPublic] = {}

APPOINTMENTS: list[Appointment] = [
    Appointment(
        id="apt-1",
        patient="Amelia Chen",
        doctor="Dr. Marcus Webb",
        specialty="Cardiology",
        type="Video",
        status="Confirmed",
        start=NOW + timedelta(hours=2, minutes=30),
        end=NOW + timedelta(hours=3),
        location="Telemedicine Room A",
    ),
    Appointment(
        id="apt-2",
        patient="James Okonkwo",
        doctor="Dr. Lena Park",
        specialty="Dermatology",
        type="In-person",
        status="Pending",
        start=NOW + timedelta(days=1, hours=-3),
        end=NOW + timedelta(days=1, hours=-2, minutes=-30),
        location="Clinic 2B",
    ),
    Appointment(
        id="apt-3",
        patient="Sofia Alvarez",
        doctor="Dr. Marcus Webb",
        specialty="Cardiology",
        type="Follow-up",
        status="Confirmed",
        start=NOW + timedelta(days=2, hours=-1),
        end=NOW + timedelta(days=2, hours=-0, minutes=-30),
        location="Wing C · Room 312",
    ),
    Appointment(
        id="apt-4",
        patient="Amelia Chen",
        doctor="Dr. Priya Shah",
        specialty="Primary Care",
        type="In-person",
        status="Completed",
        start=NOW - timedelta(days=6, hours=2),
        end=NOW - timedelta(days=6, hours=1, minutes=30),
        location="Main Campus",
    ),
    Appointment(
        id="apt-5",
        patient="Noah Kim",
        doctor="Dr. Marcus Webb",
        specialty="Cardiology",
        type="Video",
        status="Waiting",
        start=NOW + timedelta(hours=3, minutes=30),
        end=NOW + timedelta(hours=4),
        location="Telemedicine Queue",
    ),
]

PATIENTS: list[Patient] = [
    Patient(
        id="p-1",
        name="Amelia Chen",
        age=34,
        gender="Female",
        blood_type="A+",
        allergies=["Penicillin", "Peanuts"],
        conditions=["Hypertension", "Seasonal asthma"],
        medications=["Lisinopril 10mg", "Albuterol inhaler"],
        last_visit="2026-08-02",
        mrn="MRN-88421",
    ),
    Patient(
        id="p-2",
        name="James Okonkwo",
        age=47,
        gender="Male",
        blood_type="O+",
        allergies=["None known"],
        conditions=["Type 2 diabetes"],
        medications=["Metformin 500mg"],
        last_visit="2026-07-28",
        mrn="MRN-77210",
    ),
    Patient(
        id="p-3",
        name="Sofia Alvarez",
        age=29,
        gender="Female",
        blood_type="B-",
        allergies=["Latex"],
        conditions=["Migraine"],
        medications=["Sumatriptan PRN"],
        last_visit="2026-07-15",
        mrn="MRN-90112",
    ),
    Patient(
        id="p-4",
        name="Noah Kim",
        age=61,
        gender="Male",
        blood_type="AB+",
        allergies=["Sulfa drugs"],
        conditions=["Atrial fibrillation", "Hyperlipidemia"],
        medications=["Apixaban 5mg", "Atorvastatin 20mg"],
        last_visit="2026-08-05",
        mrn="MRN-55690",
    ),
]

INVOICES: list[Invoice] = [
    Invoice(
        id="INV-2041",
        patient="Amelia Chen",
        date="2026-08-02",
        amount=240,
        status="Paid",
        insurer="BlueCare Plus",
        description="Primary care visit + labs",
    ),
    Invoice(
        id="INV-2048",
        patient="Amelia Chen",
        date="2026-08-08",
        amount=120,
        status="Due",
        insurer="BlueCare Plus",
        description="Cardiology telemedicine consult",
    ),
    Invoice(
        id="INV-2033",
        patient="James Okonkwo",
        date="2026-07-28",
        amount=380,
        status="Insurance pending",
        insurer="Harbor Health",
        description="Dermatology procedure",
    ),
    Invoice(
        id="INV-2050",
        patient="Noah Kim",
        date="2026-08-05",
        amount=520,
        status="Partial",
        insurer="Summit Mutual",
        description="Cardiac monitoring + EKG",
    ),
]

MESSAGES: list[MessageThread] = [
    MessageThread(
        id="m-1",
        from_name="Dr. Marcus Webb",
        preview="Your lab results look stable. Let's discuss at tomorrow's visit.",
        time="10:24 AM",
        unread=True,
        messages=[
            {"id": "t1", "sender": "Dr. Marcus Webb", "body": "Hi Amelia — I reviewed your latest panels.", "time": "10:20 AM"},
            {"id": "t2", "sender": "Dr. Marcus Webb", "body": "Your lab results look stable. Let's discuss at tomorrow's visit.", "time": "10:24 AM"},
        ],
    ),
    MessageThread(
        id="m-2",
        from_name="Billing Support",
        preview="Your insurance claim INV-2048 is under review.",
        time="Yesterday",
        unread=True,
        messages=[
            {"id": "t1", "sender": "Billing Support", "body": "Your insurance claim INV-2048 is under review.", "time": "Yesterday"},
        ],
    ),
]

SERVICES: list[ServiceStatus] = [
    ServiceStatus(name="API Gateway", status="Operational", latency_ms=42, uptime="99.99%"),
    ServiceStatus(name="EHR Service", status="Operational", latency_ms=68, uptime="99.97%"),
    ServiceStatus(name="Telemedicine SFU", status="Degraded", latency_ms=210, uptime="99.82%"),
    ServiceStatus(name="Billing Engine", status="Operational", latency_ms=55, uptime="99.95%"),
    ServiceStatus(name="Auth / MFA", status="Operational", latency_ms=28, uptime="100%"),
]

ALERTS: list[Alert] = [
    Alert(id="al1", severity="high", title="Telemedicine SFU latency elevated", detail="p95 > 200ms for 12 minutes", time="4m"),
    Alert(id="al2", severity="medium", title="Bed capacity warning", detail="Emergency at 94% utilization", time="22m"),
    Alert(id="al3", severity="low", title="Certificate rotation due", detail="Auth TLS cert expires in 18 days", time="2h"),
]

DEPARTMENTS = [
    {"name": "Cardiology", "patients": 182, "utilization": 86},
    {"name": "Emergency", "patients": 240, "utilization": 94},
    {"name": "Pediatrics", "patients": 156, "utilization": 72},
    {"name": "Orthopedics", "patients": 121, "utilization": 68},
    {"name": "Radiology", "patients": 98, "utilization": 81},
]

HEALTH_TREND = [
    {"month": "Mar", "bp": 138, "hr": 78},
    {"month": "Apr", "bp": 134, "hr": 76},
    {"month": "May", "bp": 131, "hr": 74},
    {"month": "Jun", "bp": 129, "hr": 73},
    {"month": "Jul", "bp": 128, "hr": 72},
    {"month": "Aug", "bp": 126, "hr": 71},
]


def resolve_demo_user(email: str, role: Role | None) -> UserPublic:
    if email in USERS:
        user = USERS[email]
        if role and role != user.role:
            return user.model_copy(update={"role": role, "email": email})
        return user
    chosen: Role = role or "patient"
    templates = {u.role: u for u in USERS.values()}
    base = templates[chosen]
    return base.model_copy(update={"email": email, "id": f"u-{abs(hash(email)) % 10_000}"})
