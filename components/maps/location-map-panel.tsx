"use client"

import {
  APIProvider,
  AltitudeMode,
  Map3D,
  MapMode,
  Marker3D,
  useMapsLibrary,
  type Map3DRef,
} from "@vis.gl/react-google-maps"
import { SearchIcon } from "lucide-react"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import type { SelectedAddress } from "@/components/wizard/wizard-location"
import { cn } from "@/lib/utils"

const DEFAULT_CENTER = {
  lat: 37.7749,
  lng: -122.4194,
  altitude: 120,
}

const DEFAULT_CAMERA = {
  center: DEFAULT_CENTER,
  range: 450,
  heading: 35,
  tilt: 65,
}

interface LocationMapPanelProps {
  apiKey: string
  selectedAddress: SelectedAddress | null
  onAddressSelect: (address: SelectedAddress) => void
}

export function LocationMapPanel({
  apiKey,
  selectedAddress,
  onAddressSelect,
}: LocationMapPanelProps) {
  return (
    <APIProvider apiKey={apiKey} libraries={["places", "geocoding"]}>
      <LocationMapPanelContent
        selectedAddress={selectedAddress}
        onAddressSelect={onAddressSelect}
      />
    </APIProvider>
  )
}

function LocationMapPanelContent({
  selectedAddress,
  onAddressSelect,
}: {
  selectedAddress: SelectedAddress | null
  onAddressSelect: (address: SelectedAddress) => void
}) {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const map3dRef = useRef<Map3DRef>(null)
  const places = useMapsLibrary("places")
  const geocoding = useMapsLibrary("geocoding")
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)
  const [hasQuery, setHasQuery] = useState(Boolean(selectedAddress))
  const [position, setPosition] = useState({
    lat: selectedAddress?.lat ?? DEFAULT_CENTER.lat,
    lng: selectedAddress?.lng ?? DEFAULT_CENTER.lng,
  })
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  const selectAddress = useCallback(
    (address: SelectedAddress) => {
      setPosition({ lat: address.lat, lng: address.lng })
      setSearchError(null)
      onAddressSelect(address)

      map3dRef.current?.flyCameraTo({
        endCamera: {
          center: { lat: address.lat, lng: address.lng, altitude: 80 },
          range: 400,
          heading: 35,
          tilt: 65,
        },
        durationMillis: 1800,
      })
    },
    [onAddressSelect]
  )

  useEffect(() => {
    if (!geocoding) {
      return
    }

    geocoderRef.current = new geocoding.Geocoder()
  }, [geocoding])

  useEffect(() => {
    if (selectedAddress && searchInputRef.current) {
      searchInputRef.current.value = selectedAddress.formattedAddress
      setHasQuery(true)
    }
  }, [selectedAddress])

  useEffect(() => {
    const input = searchInputRef.current

    if (!places || !input) {
      return
    }

    const autocomplete = new places.Autocomplete(input, {
      fields: ["geometry", "formatted_address", "name"],
      types: ["address"],
    })

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      const nextPosition = place.geometry?.location
      const formattedAddress =
        place.formatted_address ?? place.name ?? input.value.trim()

      if (!nextPosition || !formattedAddress) {
        setSearchError("Could not find that address on the map.")
        return
      }

      input.value = formattedAddress
      setHasQuery(true)
      selectAddress({
        formattedAddress,
        lat: nextPosition.lat(),
        lng: nextPosition.lng(),
      })
    })

    return () => {
      listener.remove()
      google.maps.event.clearInstanceListeners(autocomplete)
    }
  }, [places, selectAddress])

  async function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const address = searchInputRef.current?.value.trim() ?? ""
    if (!address || !geocoderRef.current) {
      return
    }

    setIsSearching(true)
    setSearchError(null)

    try {
      const response = await geocoderRef.current.geocode({ address })
      const result = response.results[0]
      const location = result?.geometry.location

      if (!location) {
        setSearchError("No matching location found. Try a more specific address.")
        return
      }

      if (searchInputRef.current) {
        searchInputRef.current.value = result.formatted_address
        setHasQuery(true)
      }

      selectAddress({
        formattedAddress: result.formatted_address,
        lat: location.lat(),
        lng: location.lng(),
      })
    } catch {
      setSearchError("Unable to search that address. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="relative size-full min-h-0">
      <div className="absolute inset-x-0 top-0 z-20 p-3">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <div className="flex items-center gap-2">
            <input
              ref={searchInputRef}
              type="search"
              defaultValue={selectedAddress?.formattedAddress ?? ""}
              onInput={(event) => {
                setHasQuery(event.currentTarget.value.trim().length > 0)
                setSearchError(null)
              }}
              placeholder="Search an address"
              autoComplete="off"
              aria-label="Search map address"
              className={cn(
                "h-9 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 text-sm shadow-sm outline-none",
                "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              )}
            />
            <Button type="submit" disabled={isSearching || !hasQuery}>
              <SearchIcon data-icon="inline-start" />
              Search
            </Button>
          </div>
          {searchError ? (
            <p className="rounded-md bg-background/90 px-2 py-1 text-xs text-destructive">
              {searchError}
            </p>
          ) : null}
        </form>
      </div>
      <Map3D
        ref={map3dRef}
        className="size-full"
        mode={MapMode.HYBRID}
        defaultCenter={{
          lat: position.lat,
          lng: position.lng,
          altitude: DEFAULT_CENTER.altitude,
        }}
        defaultRange={DEFAULT_CAMERA.range}
        defaultHeading={DEFAULT_CAMERA.heading}
        defaultTilt={DEFAULT_CAMERA.tilt}
        gestureHandling="GREEDY"
      >
        <Marker3D
          position={{ ...position, altitude: 0 }}
          altitudeMode={AltitudeMode.CLAMP_TO_GROUND}
        />
      </Map3D>
    </div>
  )
}
