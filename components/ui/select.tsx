import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, id, options, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-body-sm font-semibold text-ink">
            {label}
            {props.required && <span className="ml-1 text-alert-500">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "h-11 w-full rounded-xl border border-line bg-surface-raised px-3.5 text-body-md text-ink transition-colors",
            "hover:border-line-strong focus:border-brand-500 focus:shadow-focus",
            error && "border-alert-500",
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-body-sm text-alert-600" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p className="text-body-sm text-ink-soft">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";
