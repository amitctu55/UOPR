import { cn, initials } from "@/lib/utils";

export function Avatar({ name, size = "md", className }: { name: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = { sm: "h-8 w-8 text-[10px]", md: "h-10 w-10 text-xs", lg: "h-12 w-12 text-sm" };
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700",
        sizes[size],
        className
      )}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
