from __future__ import annotations

from fastapi import APIRouter, HTTPException

from backend.data import INVOICES, Invoice

router = APIRouter(prefix="/billing", tags=["billing"])


@router.get("/invoices", response_model=list[Invoice])
def list_invoices() -> list[Invoice]:
    return INVOICES


@router.get("/invoices/{invoice_id}", response_model=Invoice)
def get_invoice(invoice_id: str) -> Invoice:
    for inv in INVOICES:
        if inv.id == invoice_id:
            return inv
    raise HTTPException(status_code=404, detail="Invoice not found.")


@router.post("/invoices/{invoice_id}/pay", response_model=Invoice)
def pay_invoice(invoice_id: str) -> Invoice:
    for inv in INVOICES:
        if inv.id == invoice_id:
            inv.status = "Paid"
            return inv
    raise HTTPException(status_code=404, detail="Invoice not found.")
