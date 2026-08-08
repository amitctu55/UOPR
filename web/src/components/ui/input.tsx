import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; hint?: string; error?: string }

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, hint, error, id, ...props }, ref) => {
  const inputId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && <label htmlFor={inputId} className="block text-body-sm font-semibold text-ink">{label}{props.required && <span className="ml-1 text-alert-500">*</span>}</label>}
      <input ref={ref} id={inputId} className={cn("h-11 w-full rounded-xl border border-line bg-surface-raised px-3.5 text-body-md text-ink placeholder:text-ink-soft transition-colors hover:border-line-strong focus:border-brand-500 focus:shadow-focus", error && "border-alert-500", className)} aria-invalid={!!error} {...props} />
      {error ? <p className="text-body-sm text-alert-600" role="alert">{error}</p> : hint ? <p className="text-body-sm text-ink-soft">{hint}</p> : null}
    </div>
  );
});
Input.displayName = "Input";
