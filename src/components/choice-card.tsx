import { cn } from "@/lib/utils";

/**
 * A native radio or checkbox styled as a selectable card. Selection state is
 * pure CSS (`has-checked`), so it works inside a plain <form> with no client JS.
 */
export function ChoiceCard({
  className,
  children,
  type = "radio",
  ...inputProps
}: Omit<React.ComponentProps<"input">, "type" | "children"> & {
  type?: "radio" | "checkbox";
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer rounded-lg border bg-card p-3 text-sm transition-colors hover:bg-muted/50",
        "has-checked:border-primary has-checked:ring-1 has-checked:ring-primary",
        "has-focus-visible:ring-2 has-focus-visible:ring-ring/50",
        "has-disabled:cursor-not-allowed has-disabled:border-dashed has-disabled:bg-transparent has-disabled:text-muted-foreground/60 has-disabled:hover:bg-transparent",
        className,
      )}
    >
      <input type={type} className="sr-only" {...inputProps} />
      {children}
    </label>
  );
}
