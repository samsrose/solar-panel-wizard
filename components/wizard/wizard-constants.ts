export const TOTAL_STEPS = 3
export const PANEL_UNIT_PRICE = 600
export const BATTERY_UNIT_PRICE = 1200
export const INSTALLATION_PER_PANEL = 300
export const TAX_RATE = 0.18
export const STEP_DESIGN_FORM_ID = "step-design-form"

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getPricingBreakdown(panelCount: number, batteryCount: number) {
  const panels = panelCount * PANEL_UNIT_PRICE
  const batteries = batteryCount * BATTERY_UNIT_PRICE
  const installation = panelCount * INSTALLATION_PER_PANEL
  const subtotal = panels + batteries + installation
  const tax = Math.round(subtotal * TAX_RATE)
  const grandTotal = subtotal + tax

  return {
    panelCount,
    batteryCount,
    panels,
    batteries,
    installation,
    subtotal,
    tax,
    grandTotal,
  }
}
