"use client"

import { ContactShadows, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMemo } from "react"

import { createAddressHouseModel } from "@/components/canvas/img2threejs/create-address-house-model"
import type { SelectedAddress } from "@/components/wizard/wizard-location"

interface AddressModelViewerProps {
  address: SelectedAddress | null
}

export function AddressModelViewer({ address }: AddressModelViewerProps) {
  if (!address) {
    return (
      <div className="flex size-full items-center justify-center bg-muted/40 p-6 text-center">
        <p className="max-w-sm text-sm text-muted-foreground">
          Select an address on step 1 to generate a 3D property model.
        </p>
      </div>
    )
  }

  return (
    <div className="relative size-full min-h-0 bg-muted/30">
      <div className="absolute inset-x-0 top-0 z-10 p-3">
        <div className="rounded-lg border bg-background/95 px-3 py-2 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">
            img2threejs model
          </p>
          <p className="truncate text-sm text-foreground">
            {address.formattedAddress}
          </p>
        </div>
      </div>
      <Canvas
        shadows
        camera={{ position: [5.5, 4.2, 5.5], fov: 40 }}
        className="size-full"
      >
        <color attach="background" args={["#dfe7ef"]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          castShadow
          intensity={1.15}
          position={[6, 10, 4]}
          shadow-mapSize={[1024, 1024]}
        />
        <AddressHouseModel key={address.formattedAddress} />
        <ContactShadows
          opacity={0.4}
          scale={12}
          blur={2.2}
          far={8}
          position={[0, 0.01, 0]}
        />
        <OrbitControls
          makeDefault
          enablePan={false}
          minPolarAngle={0.6}
          maxPolarAngle={1.45}
          minDistance={4}
          maxDistance={12}
          target={[0, 1, 0]}
        />
      </Canvas>
    </div>
  )
}

function AddressHouseModel() {
  const model = useMemo(() => createAddressHouseModel(), [])

  return <primitive object={model} />
}
