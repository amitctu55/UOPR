import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-body-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:shadow-focus",
  {
    variants: {
      variant: {
        primary: "bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98] dark:bg-brand-500 dark:text-brand-900 dark:hover:bg-brand-400",
        secondary: "border border-line bg-surface-raised text-ink hover:border-line-strong hover:bg-surface-muted",
        ghost: "text-ink-muted hover:bg-surface-muted hover:text-ink",
        danger: "bg-alert-500 text-white hover:bg-alert-600",
        soft: "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-100 dark:text-brand-700",
      },
      size: { sm: "h-9 px-3.5", md: "h-11 px-5", lg: "h-12 px-6 text-body-md", icon: "h-10 w-10" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { loading?: boolean }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, loading, children, disabled, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || loading} {...props}>
    {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
    {children}
  </button>
));
Button.displayName = "Button";
