"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import type { FormEvent } from "react"

import { AddressModelViewer } from "@/components/canvas/address-model-viewer"
import { Button } from "@/components/ui/button"
import {
  BATTERY_UNIT_PRICE,
  PANEL_UNIT_PRICE,
  STEP_DESIGN_FORM_ID,
  formatCurrency,
} from "@/components/wizard/wizard-constants"
import type { SelectedAddress } from "@/components/wizard/wizard-location"
import { WizardTwoColumnLayout } from "@/components/wizard/wizard-two-column-layout"

interface StepDesignProps {
  selectedAddress: SelectedAddress | null
  panelCount: number
  batteryCount: number
  onPanelCountChange: (panelCount: number) => void
  onBatteryCountChange: (batteryCount: number) => void
  onSubmit: () => void
}

export function StepDesign({
  selectedAddress,
  panelCount,
  batteryCount,
  onPanelCountChange,
  onBatteryCountChange,
  onSubmit,
}: StepDesignProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <WizardTwoColumnLayout
      rightLabelledBy="step-design-heading"
      left={<AddressModelViewer address={selectedAddress} />}
      right={
        <form
          id={STEP_DESIGN_FORM_ID}
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <h2
              id="step-design-heading"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              Configure Your Solar Panel Array
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Use the controls below to set the number of panels and batteries
              for your system. Panels are priced at{" "}
              {formatCurrency(PANEL_UNIT_PRICE)} each and batteries at{" "}
              {formatCurrency(BATTERY_UNIT_PRICE)} each; both update the running
              total in the footer. Modern residential modules typically convert
              20–23% of available sunlight into electricity; pairing them with
              storage helps retain surplus production for evening use. Select an
              appropriate quantity to balance roof coverage, expected annual
              production, and long-term return. When your configuration looks
              right, select Finalize to confirm and proceed.
            </p>
          </div>

          <QuantityField
            label="Solar panels"
            value={panelCount}
            onDecrease={() => onPanelCountChange(Math.max(0, panelCount - 1))}
            onIncrease={() => onPanelCountChange(panelCount + 1)}
            decreaseLabel="Remove one solar panel"
            increaseLabel="Add one solar panel"
          />

          <QuantityField
            label="Batteries"
            value={batteryCount}
            onDecrease={() =>
              onBatteryCountChange(Math.max(0, batteryCount - 1))
            }
            onIncrease={() => onBatteryCountChange(batteryCount + 1)}
            decreaseLabel="Remove one battery"
            increaseLabel="Add one battery"
          />
        </form>
      }
    />
  )
}

interface QuantityFieldProps {
  label: string
  value: number
  onDecrease: () => void
  onIncrease: () => void
  decreaseLabel: string
  increaseLabel: string
}

function QuantityField({
  label,
  value,
  onDecrease,
  onIncrease,
  decreaseLabel,
  increaseLabel,
}: QuantityFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onDecrease}
          disabled={value === 0}
          aria-label={decreaseLabel}
        >
          <MinusIcon />
        </Button>
        <output
          className="min-w-12 text-center text-lg font-semibold tabular-nums text-foreground"
          aria-live="polite"
        >
          {value}
        </output>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onIncrease}
          aria-label={increaseLabel}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}
