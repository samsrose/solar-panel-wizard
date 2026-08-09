"use client"

import { LocationMapPanel } from "@/components/maps/location-map-panel"
import type { SelectedAddress } from "@/components/wizard/wizard-location"
import { WizardTwoColumnLayout } from "@/components/wizard/wizard-two-column-layout"

interface StepLocationProps {
  selectedAddress: SelectedAddress | null
  onAddressSelect: (address: SelectedAddress) => void
}

export function StepLocation({
  selectedAddress,
  onAddressSelect,
}: StepLocationProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  return (
    <WizardTwoColumnLayout
      rightLabelledBy="step-location-heading"
      left={
        apiKey ? (
          <LocationMapPanel
            apiKey={apiKey}
            selectedAddress={selectedAddress}
            onAddressSelect={onAddressSelect}
          />
        ) : (
          <div className="flex size-full flex-col gap-3 p-3">
            <div className="rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground">
              Search an address
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed bg-background p-6 text-center text-sm text-muted-foreground">
              Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to enable Google 3D Maps.
            </div>
          </div>
        )
      }
      right={
        <>
          <h2
            id="step-location-heading"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Design Your Solar Array with Confidence
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This guided experience helps you evaluate your property and plan a
            solar installation that fits your roof, your goals, and your budget.
            Begin by confirming your home’s location so we can orient the design
            around your actual site conditions. From there, you will configure
            system options, arrange panels in a clear visual layout, and review
            estimated production and pricing—streamlining what is typically a
            complex planning process into a structured, professional workflow.
          </p>
        </>
      }
    />
  )
}
