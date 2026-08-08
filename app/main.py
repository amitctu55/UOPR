from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import appointments, auth, billing, messaging, monitoring, patients

app = FastAPI(
    title="UPCHAR API",
    description="Enterprise healthcare platform API (demo)",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://0.0.0.0:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(appointments.router, prefix="/api")
app.include_router(patients.router, prefix="/api")
app.include_router(billing.router, prefix="/api")
app.include_router(messaging.router, prefix="/api")
app.include_router(monitoring.router, prefix="/api")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "upchar-api"}
