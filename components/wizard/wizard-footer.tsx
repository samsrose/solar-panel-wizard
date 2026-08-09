"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const TOTAL_STEPS = 3

interface WizardFooterProps {
  step: number
  onPrevious: () => void
  onNext: () => void
}

export function WizardFooter({ step, onPrevious, onNext }: WizardFooterProps) {
  const stepNumber = step + 1
  const progressValue = (stepNumber / TOTAL_STEPS) * 100
  const isFirstStep = step === 0
  const isLastStep = step === TOTAL_STEPS - 1

  return (
    <footer className="flex shrink-0 items-center justify-between gap-4 border-t bg-background px-4 py-3">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Step {stepNumber} of {TOTAL_STEPS}
        </p>
        <Progress value={progressValue} className="w-full max-w-xs" />
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStep}
        >
          Previous
        </Button>
        <Button type="button" onClick={onNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </footer>
  )
}
