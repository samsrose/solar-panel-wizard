import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface WizardTwoColumnLayoutProps {
  left: ReactNode
  right: ReactNode
  rightLabelledBy?: string
  /** `aside` keeps a wide left column; `split` is 50/50. */
  variant?: "aside" | "split"
}

export function WizardTwoColumnLayout({
  left,
  right,
  rightLabelledBy,
  variant = "aside",
}: WizardTwoColumnLayoutProps) {
  return (
    <div
      className={cn(
        "grid size-full min-h-0 grid-cols-1",
        variant === "split"
          ? "md:grid-cols-2"
          : "md:grid-cols-[minmax(0,1fr)_25vw]"
      )}
    >
      <section
        className={cn(
          "relative min-h-0 border-r",
          variant === "split"
            ? "flex flex-col justify-center overflow-y-auto bg-background p-6"
            : "bg-muted/30"
        )}
      >
        {left}
      </section>
      <section
        className="flex min-h-0 flex-col justify-center gap-4 overflow-y-auto bg-background p-6 text-left"
        aria-labelledby={rightLabelledBy}
      >
        {right}
      </section>
    </div>
  )
}
