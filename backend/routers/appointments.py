from __future__ import annotations

from datetime import timedelta

from fastapi import APIRouter, HTTPException

from backend.data import APPOINTMENTS, Appointment, AppointmentCreate

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.get("", response_model=list[Appointment])
def list_appointments() -> list[Appointment]:
    return APPOINTMENTS


@router.get("/{appointment_id}", response_model=Appointment)
def get_appointment(appointment_id: str) -> Appointment:
    for apt in APPOINTMENTS:
        if apt.id == appointment_id:
            return apt
    raise HTTPException(status_code=404, detail="Appointment not found.")


@router.post("", response_model=Appointment, status_code=201)
def create_appointment(payload: AppointmentCreate) -> Appointment:
    apt = Appointment(
        id=f"apt-{len(APPOINTMENTS) + 1}",
        patient=payload.patient,
        doctor=payload.doctor,
        specialty=payload.specialty,
        type=payload.type,
        status="Confirmed",
        start=payload.start,
        end=payload.start + timedelta(minutes=payload.duration_minutes),
        location=payload.location,
    )
    APPOINTMENTS.append(apt)
    return apt
