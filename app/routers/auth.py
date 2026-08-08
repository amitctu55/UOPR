from __future__ import annotations

import secrets

from fastapi import APIRouter, Header, HTTPException

from app.data import (
    PENDING_MFA,
    SESSIONS,
    LoginRequest,
    MfaRequest,
    RegisterRequest,
    TokenResponse,
    UserPublic,
    resolve_demo_user,
)

router = APIRouter(prefix="/auth", tags=["auth"])


def user_from_auth(authorization: str | None) -> UserPublic:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token.")
    token = authorization.split(" ", 1)[1].strip()
    user = SESSIONS.get(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired session.")
    return user


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    user = resolve_demo_user(payload.email.lower().strip(), payload.role)
    PENDING_MFA[user.email] = user
    return TokenResponse(access_token="", user=user, mfa_required=True)


@router.post("/mfa", response_model=TokenResponse)
def verify_mfa(payload: MfaRequest) -> TokenResponse:
    email = payload.email.lower().strip()
    user = PENDING_MFA.get(email)
    if not user:
        raise HTTPException(status_code=400, detail="No MFA challenge pending for this email.")
    if not payload.code.isdigit() or len(payload.code) != 6:
        raise HTTPException(status_code=400, detail="Enter a valid 6-digit code.")
    token = secrets.token_urlsafe(24)
    SESSIONS[token] = user
    PENDING_MFA.pop(email, None)
    return TokenResponse(access_token=token, user=user, mfa_required=False)


@router.post("/register", response_model=UserPublic, status_code=201)
def register(payload: RegisterRequest) -> UserPublic:
    user = UserPublic(
        id=f"u-{secrets.token_hex(4)}",
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        role=payload.role,
        organization="Self" if payload.role == "patient" else "UPCHAR Network",
    )
    PENDING_MFA[user.email] = user
    return user


@router.post("/verify-email", response_model=TokenResponse)
def verify_email(payload: MfaRequest) -> TokenResponse:
    email = payload.email.lower().strip()
    user = PENDING_MFA.get(email) or resolve_demo_user(email, None)
    if not payload.code.isdigit() or len(payload.code) != 6:
        raise HTTPException(status_code=400, detail="Invalid verification code.")
    token = secrets.token_urlsafe(24)
    SESSIONS[token] = user
    PENDING_MFA.pop(email, None)
    return TokenResponse(access_token=token, user=user, mfa_required=False)


@router.get("/me", response_model=UserPublic)
def me(authorization: str | None = Header(default=None)) -> UserPublic:
    return user_from_auth(authorization)
