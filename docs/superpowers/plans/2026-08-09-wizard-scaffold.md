# Solar Panel Wizard Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a full-screen three-step Next.js wizard shell with shadcn footer controls and an unused R3F scene stub.

**Architecture:** Single App Router page mounts a client `WizardShell` that owns step index state (`0 | 1 | 2`). The main region renders an empty `StepPlaceholder`. A bottom `WizardFooter` shows progress plus Previous/Next. R3F is installed with `SceneStub` present but not mounted in the UI.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui (`Button`, `Progress`), `@react-three/fiber`, `@react-three/drei`, `three`, npm

---

## File map

| Path | Responsibility |
| --- | --- |
| `app/layout.tsx` | Root layout; no header chrome |
| `app/page.tsx` | Server page that renders `WizardShell` |
| `app/globals.css` | Tailwind + shadcn tokens (from init) |
| `components/wizard/wizard-shell.tsx` | Step state + full-viewport layout |
| `components/wizard/wizard-footer.tsx` | Progress label/bar + Prev/Next |
| `components/wizard/steps/step-placeholder.tsx` | Empty step panel |
| `components/canvas/scene-stub.tsx` | Unused R3F Canvas stub |
| `components/ui/button.tsx` | shadcn Button |
| `components/ui/progress.tsx` | shadcn Progress |
| `lib/utils.ts` | `cn()` helper from shadcn |

---

### Task 1: Bootstrap Next.js + shadcn + R3F

**Files:**
- Create: Next.js app files via `create-next-app`
- Create: `components.json`, `components/ui/*`, `lib/utils.ts` via shadcn
- Modify: `.gitignore` only if create-next-app overwrites useful entries

- [ ] **Step 1: Create Next.js app in the repo root**

Run from `/Users/admin/Documents/GitHub/solar-panel-wizard`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --turbopack --yes
```

Expected: App files created alongside existing `docs/` and `.gitignore`. If the CLI refuses a non-empty directory, use:

```bash
npx create-next-app@latest web --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --turbopack --yes
```

Then move `web/*` and `web/.*` (except `.git`) into the repo root and remove `web/`. Prefer root install when possible.

- [ ] **Step 2: Initialize shadcn and add Button + Progress**

```bash
npx shadcn@latest init --defaults --force
npx shadcn@latest add button progress --yes
```

Expected: `components.json`, `lib/utils.ts`, `components/ui/button.tsx`, `components/ui/progress.tsx`.

- [ ] **Step 3: Install React Three Fiber dependencies**

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

Expected: packages listed in `package.json` dependencies/devDependencies.

- [ ] **Step 4: Commit bootstrap**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: bootstrap Next.js, shadcn, and R3F dependencies

EOF
)"
```

---

### Task 2: Wizard shell UI

**Files:**
- Create: `components/wizard/steps/step-placeholder.tsx`
- Create: `components/wizard/wizard-footer.tsx`
- Create: `components/wizard/wizard-shell.tsx`
- Create: `components/canvas/scene-stub.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx` (ensure no header; body can be full viewport)

- [ ] **Step 1: Create empty step placeholder**

Create `components/wizard/steps/step-placeholder.tsx`:

```tsx
export function StepPlaceholder() {
  return <div className="size-full" aria-hidden="true" />
}
```

- [ ] **Step 2: Create wizard footer**

Create `components/wizard/wizard-footer.tsx`:

```tsx
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
        <Progress value={progressValue} className="h-2 w-full max-w-xs" />
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
```

Note: Disabling Next on the last step keeps navigation within the three empty steps with no Finish flow (matches “no Finish/submit”).

- [ ] **Step 3: Create wizard shell**

Create `components/wizard/wizard-shell.tsx`:

```tsx
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
```

- [ ] **Step 4: Create unused R3F scene stub**

Create `components/canvas/scene-stub.tsx`:

```tsx
"use client"

import { Canvas } from "@react-three/fiber"

export function SceneStub() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  )
}
```

Do not import `SceneStub` from `app/page.tsx` or `WizardShell`.

- [ ] **Step 5: Wire the page and layout**

Replace `app/page.tsx` with:

```tsx
import { WizardShell } from "@/components/wizard/wizard-shell"

export default function HomePage() {
  return <WizardShell />
}
```

Ensure `app/layout.tsx` has no custom header. Keep default fonts/metadata from create-next-app, but set body class so the shell can fill the viewport, for example:

```tsx
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  {children}
</body>
```

(Adapt to whatever font variables create-next-app generated; do not add a header.)

- [ ] **Step 6: Verify build and smoke-check behavior**

```bash
npm run build
```

Expected: successful production build.

Then:

```bash
npm run dev
```

Manually confirm:
1. Full-screen empty main area, no header
2. Footer shows “Step 1 of 3”, Previous disabled, Next enabled
3. Next advances to steps 2 and 3; progress updates; Next disabled on step 3
4. Previous returns to earlier steps

- [ ] **Step 7: Commit wizard shell**

```bash
git add app/page.tsx app/layout.tsx components/wizard components/canvas
git commit -m "$(cat <<'EOF'
feat: add full-screen three-step wizard shell

EOF
)"
```

---

## Spec coverage check

| Spec requirement | Task |
| --- | --- |
| Full viewport, no header | Task 2 |
| Empty main / three page steps | Task 2 |
| Footer progress + Prev/Next | Task 2 |
| Client `useState` step index | Task 2 |
| shadcn Button + Progress | Task 1–2 |
| R3F deps + unused stub | Task 1–2 |
| npm / Next.js App Router | Task 1 |
