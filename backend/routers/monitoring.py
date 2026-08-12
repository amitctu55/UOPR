from __future__ import annotations

from fastapi import APIRouter

from backend.data import ALERTS, DEPARTMENTS, HEALTH_TREND, SERVICES, Alert, ServiceStatus

router = APIRouter(prefix="/monitoring", tags=["monitoring"])


@router.get("/services", response_model=list[ServiceStatus])
def list_services() -> list[ServiceStatus]:
    return SERVICES


@router.get("/alerts", response_model=list[Alert])
def list_alerts() -> list[Alert]:
    return ALERTS


@router.get("/departments")
def list_departments() -> list[dict]:
    return DEPARTMENTS


@router.get("/health-trend")
def health_trend() -> list[dict]:
    return HEALTH_TREND
