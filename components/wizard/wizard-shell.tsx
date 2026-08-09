"use client"

import { useState } from "react"

import { StepPlaceholder } from "@/components/wizard/steps/step-placeholder"
import { WizardFooter } from "@/components/wizard/wizard-footer"

const TOTAL_STEPS = 3

export function WizardShell() {
  const [step, setStep] = useState(0)

  function handlePrevious() {
    setStep((current) => Math.max(0, current - 1))
  }

  function handleNext() {
    setStep((current) => Math.min(TOTAL_STEPS - 1, current + 1))
  }

  return (
    <div className="flex h-dvh min-h-dvh flex-col bg-background">
      <main className="min-h-0 flex-1">
        <StepPlaceholder key={step} />
      </main>
      <WizardFooter
        step={step}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  )
}
