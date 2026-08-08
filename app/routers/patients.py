from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.data import PATIENTS, Patient

router = APIRouter(prefix="/patients", tags=["patients"])


@router.get("", response_model=list[Patient])
def list_patients() -> list[Patient]:
    return PATIENTS


@router.get("/{patient_id}", response_model=Patient)
def get_patient(patient_id: str) -> Patient:
    for patient in PATIENTS:
        if patient.id == patient_id:
            return patient
    raise HTTPException(status_code=404, detail="Patient not found.")
