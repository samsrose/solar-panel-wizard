"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import { useState, type FormEvent, type SVGProps } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  formatCurrency,
  getPricingBreakdown,
} from "@/components/wizard/wizard-constants"
import { WizardTwoColumnLayout } from "@/components/wizard/wizard-two-column-layout"

const TERM_STEP_MONTHS = 12
const TERM_MIN_MONTHS = 12

interface StepCheckoutProps {
  panelCount: number
  batteryCount: number
}

export function StepCheckout({ panelCount, batteryCount }: StepCheckoutProps) {
  const pricing = getPricingBreakdown(panelCount, batteryCount)
  const [hasInsurance, setHasInsurance] = useState(false)
  const [insuranceMonths, setInsuranceMonths] = useState(TERM_MIN_MONTHS)
  const [isSelfInstallation, setIsSelfInstallation] = useState(false)
  const [hasFinancing, setHasFinancing] = useState(false)
  const [financingMonths, setFinancingMonths] = useState(TERM_MIN_MONTHS)

  function handleCreateAccount() {
    // Placeholder for account creation flow.
  }

  function handleSocialSignIn() {
    // Placeholder for social authentication.
  }

  function handleCheckoutSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Placeholder for checkout submission.
  }

  function handleInsuranceCheckedChange(checked: boolean) {
    setHasInsurance(checked)

    if (checked) {
      setInsuranceMonths(TERM_MIN_MONTHS)
    }
  }

  function handleFinancingCheckedChange(checked: boolean) {
    setHasFinancing(checked)

    if (checked) {
      setFinancingMonths(TERM_MIN_MONTHS)
    }
  }

  return (
    <WizardTwoColumnLayout
      variant="split"
      rightLabelledBy="step-checkout-heading"
      left={
        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleSocialSignIn}
            >
              <GoogleIcon data-icon="inline-start" />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleSocialSignIn}
            >
              <AppleIcon data-icon="inline-start" />
              Continue with Apple
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={handleCreateAccount}
            >
              Create account
            </Button>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleCheckoutSubmit}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="card-name">Name on card</FieldLabel>
                <Input
                  id="card-name"
                  name="cardName"
                  autoComplete="cc-name"
                  placeholder="Jane Homeowner"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="card-number">Card number</FieldLabel>
                <Input
                  id="card-number"
                  name="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="ACCT-000015"
                  required
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="card-expiry">Expiration</FieldLabel>
                  <Input
                    id="card-expiry"
                    name="cardExpiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="card-cvc">CVC</FieldLabel>
                  <Input
                    id="card-cvc"
                    name="cardCvc"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    required
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="billing-address">Billing address</FieldLabel>
                <Input
                  id="billing-address"
                  name="billingAddress"
                  autoComplete="billing street-address"
                  placeholder="123 Solar Ave"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="billing-address-line2">
                  Apartment, suite, etc. (optional)
                </FieldLabel>
                <Input
                  id="billing-address-line2"
                  name="billingAddressLine2"
                  autoComplete="billing address-line2"
                  placeholder="Unit 4"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="billing-city">City</FieldLabel>
                  <Input
                    id="billing-city"
                    name="billingCity"
                    autoComplete="billing address-level2"
                    placeholder="Austin"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="billing-state">State</FieldLabel>
                  <Input
                    id="billing-state"
                    name="billingState"
                    autoComplete="billing address-level1"
                    placeholder="TX"
                    required
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="billing-postal">ZIP code</FieldLabel>
                  <Input
                    id="billing-postal"
                    name="billingPostal"
                    autoComplete="billing postal-code"
                    placeholder="78701"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="billing-country">Country</FieldLabel>
                  <Input
                    id="billing-country"
                    name="billingCountry"
                    autoComplete="billing country-name"
                    placeholder="United States"
                    required
                  />
                </Field>
              </div>
            </FieldGroup>

            <Button type="submit" className="w-full">
              Checkout
            </Button>
          </form>
        </div>
      }
      right={
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2
              id="step-checkout-heading"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              A Long-Term Investment in Energy Independence
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Solar is one of the most durable improvements you can make to a
              home. A well-designed array reduces utility dependence, protects
              against rising electricity costs, and can increase property appeal
              for future buyers. With efficient modern panels and optional
              storage, you capture more of the value of every sunny hour—turning
              a predictable monthly energy expense into a controlled asset that
              works for your household for decades.
            </p>
          </div>

          <FieldSet>
            <FieldGroup className="gap-3">
              <OptionCheckbox
                id="option-insurance"
                label="Insurance"
                checked={hasInsurance}
                onCheckedChange={handleInsuranceCheckedChange}
              />
              {hasInsurance ? (
                <MonthTermControl
                  label="Insurance term"
                  months={insuranceMonths}
                  onMonthsChange={setInsuranceMonths}
                  decreaseLabel="Decrease insurance term by 12 months"
                  increaseLabel="Increase insurance term by 12 months"
                />
              ) : null}
              <OptionCheckbox
                id="option-self-installation"
                label="Self-installation"
                checked={isSelfInstallation}
                onCheckedChange={setIsSelfInstallation}
              />
              <OptionCheckbox
                id="option-financing"
                label="Financing"
                checked={hasFinancing}
                onCheckedChange={handleFinancingCheckedChange}
              />
              {hasFinancing ? (
                <MonthTermControl
                  label="Financing term"
                  months={financingMonths}
                  onMonthsChange={setFinancingMonths}
                  decreaseLabel="Decrease financing term by 12 months"
                  increaseLabel="Increase financing term by 12 months"
                />
              ) : null}
            </FieldGroup>
          </FieldSet>

          <Separator />

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">
              Pricing breakdown
            </p>
            <dl className="flex flex-col gap-2 text-sm">
              <BreakdownRow
                label={`Panels (${pricing.panelCount})`}
                value={pricing.panels}
              />
              <BreakdownRow
                label={`Batteries (${pricing.batteryCount})`}
                value={pricing.batteries}
              />
              <BreakdownRow
                label="Installation"
                value={pricing.installation}
              />
              <BreakdownRow label="Tax (18%)" value={pricing.tax} />
              <div className="my-1 h-px bg-border" />
              <BreakdownRow
                label="Grand total"
                value={pricing.grandTotal}
                emphasized
              />
            </dl>
          </div>
        </div>
      }
    />
  )
}

function MonthTermControl({
  label,
  months,
  onMonthsChange,
  decreaseLabel,
  increaseLabel,
}: {
  label: string
  months: number
  onMonthsChange: (months: number) => void
  decreaseLabel: string
  increaseLabel: string
}) {
  return (
    <div className="flex flex-col gap-3 pl-6">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() =>
            onMonthsChange(
              Math.max(TERM_MIN_MONTHS, months - TERM_STEP_MONTHS)
            )
          }
          disabled={months <= TERM_MIN_MONTHS}
          aria-label={decreaseLabel}
        >
          <MinusIcon />
        </Button>
        <output
          className="min-w-16 text-center text-lg font-semibold tabular-nums text-foreground"
          aria-live="polite"
        >
          {months} mo
        </output>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onMonthsChange(months + TERM_STEP_MONTHS)}
          aria-label={increaseLabel}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}

function BreakdownRow({
  label,
  value,
  emphasized = false,
}: {
  label: string
  value: number
  emphasized?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt
        className={
          emphasized
            ? "font-medium text-foreground"
            : "text-muted-foreground"
        }
      >
        {label}
      </dt>
      <dd
        className={
          emphasized
            ? "font-semibold tabular-nums text-foreground"
            : "tabular-nums text-foreground"
        }
      >
        {formatCurrency(value)}
      </dd>
    </div>
  )
}

interface OptionCheckboxProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function OptionCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
}: OptionCheckboxProps) {
  return (
    <Field orientation="horizontal" className="items-center">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
      />
      <Label htmlFor={id} className="font-normal">
        {label}
      </Label>
    </Field>
  )
}

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-1 2.3-2.1 3v2.5h3.4c2-1.8 3-4.5 3-7.3z"
      />
      <path
        fill="currentColor"
        d="M12 22c2.8 0 5.1-.9 6.8-2.5l-3.4-2.5c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H2.9v2.6C4.6 19.8 8 22 12 22z"
      />
      <path
        fill="currentColor"
        d="M6.4 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.5H2.9C2.3 8.8 2 10.2 2 12s.3 3.2.9 4.5l3.5-2.6z"
      />
      <path
        fill="currentColor"
        d="M12 5.9c1.5 0 2.9.5 3.9 1.5l2.9-2.9C17.1 2.8 14.8 2 12 2 8 2 4.6 4.2 2.9 7.5l3.5 2.6C7.2 7.7 9.4 5.9 12 5.9z"
      />
    </svg>
  )
}

function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.5 12.2c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3.1-1.6-1.3-.1-2.6.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.2 2.8 2.2 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.1-2.4 1.1-2.5-.1 0-2.2-.8-2.2-3.3zM14.7 5.8c.6-.8 1-1.8.9-2.9-.9 0-1.9.6-2.5 1.3-.6.7-1 1.7-.9 2.7 1 .1 1.9-.5 2.5-1.1z" />
    </svg>
  )
}
