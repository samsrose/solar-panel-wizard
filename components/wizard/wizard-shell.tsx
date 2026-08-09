"use client"

import { useState } from "react"

import { StepCheckout } from "@/components/wizard/steps/step-checkout"
import { StepDesign } from "@/components/wizard/steps/step-design"
import { StepLocation } from "@/components/wizard/steps/step-location"
import {
  TOTAL_STEPS,
  getPricingBreakdown,
} from "@/components/wizard/wizard-constants"
import { WizardFooter } from "@/components/wizard/wizard-footer"
import type { SelectedAddress } from "@/components/wizard/wizard-location"

export function WizardShell() {
  const [step, setStep] = useState(0)
  const [selectedAddress, setSelectedAddress] =
    useState<SelectedAddress | null>(null)
  const [panelCount, setPanelCount] = useState(0)
  const [batteryCount, setBatteryCount] = useState(0)

  const { grandTotal } = getPricingBreakdown(panelCount, batteryCount)

  function handlePrevious() {
    setStep((current) => Math.max(0, current - 1))
  }

  function handleNext() {
    setStep((current) => Math.min(TOTAL_STEPS - 1, current + 1))
  }

  return (
    <div className="flex h-dvh min-h-dvh flex-col bg-background">
      <main className="min-h-0 flex-1">
        {step === 0 ? (
          <StepLocation
            selectedAddress={selectedAddress}
            onAddressSelect={setSelectedAddress}
          />
        ) : null}
        {step === 1 ? (
          <StepDesign
            selectedAddress={selectedAddress}
            panelCount={panelCount}
            batteryCount={batteryCount}
            onPanelCountChange={setPanelCount}
            onBatteryCountChange={setBatteryCount}
            onSubmit={handleNext}
          />
        ) : null}
        {step === 2 ? (
          <StepCheckout
            panelCount={panelCount}
            batteryCount={batteryCount}
          />
        ) : null}
      </main>
      <WizardFooter
        step={step}
        totalPrice={grandTotal}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  )
}
