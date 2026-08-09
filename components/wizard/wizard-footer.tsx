"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  STEP_DESIGN_FORM_ID,
  TOTAL_STEPS,
  formatCurrency,
} from "@/components/wizard/wizard-constants"

interface WizardFooterProps {
  step: number
  totalPrice: number
  onPrevious: () => void
  onNext: () => void
}

export function WizardFooter({
  step,
  totalPrice,
  onPrevious,
  onNext,
}: WizardFooterProps) {
  const stepNumber = step + 1
  const progressValue = (stepNumber / TOTAL_STEPS) * 100
  const isFirstStep = step === 0
  const isLastStep = step === TOTAL_STEPS - 1
  const isDesignStep = step === 1

  return (
    <footer className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 border-t bg-background px-4 py-3">
      <div className="justify-self-start">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStep}
        >
          Previous
        </Button>
      </div>
      <div className="flex w-[50vw] flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Step {stepNumber} of {TOTAL_STEPS}
        </p>
        <Progress value={progressValue} className="w-full" />
      </div>
      <div className="flex w-full items-center justify-self-stretch">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm tabular-nums text-muted-foreground">
            Total:{" "}
            <span className="font-medium text-foreground">
              {formatCurrency(totalPrice)}
            </span>
          </p>
        </div>
        {isDesignStep ? (
          <Button key="design-submit" type="submit" form={STEP_DESIGN_FORM_ID}>
            Finalize
          </Button>
        ) : null}
        {!isDesignStep && !isLastStep ? (
          <Button key="step-next" type="button" onClick={onNext}>
            Next
          </Button>
        ) : null}
      </div>
    </footer>
  )
}
