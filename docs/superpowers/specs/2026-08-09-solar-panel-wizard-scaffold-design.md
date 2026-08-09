# Solar Panel Wizard Scaffold — Design

Date: 2026-08-09  
Status: Approved for implementation planning

## Goal

Scaffold a Next.js App Router app with shadcn/ui and React Three Fiber for a full-screen, three-step product wizard. First delivery is an empty shell: step navigation and footer only. No product content and no hero 3D scene yet.

## Decisions

| Topic | Choice |
| --- | --- |
| Layout | Full viewport, no header; empty main area; bottom footer |
| Steps | Three full-page steps (not a card grid) |
| Step content | Empty placeholder panels |
| Wizard state | Client `useState` step index `0 \| 1 \| 2` on a single route |
| 3D | R3F packages installed + unused scene stub; not mounted as UI hero |
| UI kit | shadcn (`Button`, `Progress`) |

## Shell & layout

- App fills the viewport (`h-dvh` / `min-h-dvh`), no site header.
- Main region grows and stays empty for all three steps.
- Fixed bottom footer contains:
  - Progress: “Step N of 3” plus a progress bar at `(step + 1) / 3`
  - Previous button (disabled on step 0)
  - Next button (enabled through step 2; label stays “Next”; no Finish/submit flow)

## Stack

- Next.js (App Router) + React + TypeScript + Tailwind CSS
- Package manager: npm (via `create-next-app`)
- shadcn/ui
- `@react-three/fiber`, `@react-three/drei`, `three`

## Component structure

```
app/page.tsx                          → mounts client wizard shell
components/wizard/wizard-shell.tsx    → step state + full-screen layout
components/wizard/wizard-footer.tsx   → progress + Prev/Next
components/wizard/steps/step-placeholder.tsx → empty step panel
components/canvas/scene-stub.tsx      → R3F Canvas stub (not used in UI yet)
```

## Behavior

- Prev/Next only update the step index.
- No validation, persistence, routing by step, or form submit.
- All three steps render the same empty placeholder.
- Styling uses shadcn semantic tokens; no custom theme work beyond defaults.

## Out of scope

- Real solar-panel product copy, options, or forms
- Mounting or styling a 3D scene in the wizard
- URL-synced or path-based steps
- Auth, analytics, i18n, tests beyond smoke that the app builds

## Success criteria

1. `npm run dev` (or project package manager equivalent) shows a full-screen empty wizard.
2. Footer advances through three steps with correct progress and disabled Previous on step 1.
3. shadcn Button/Progress are in use.
4. R3F dependencies install cleanly; scene stub exists for later use.
