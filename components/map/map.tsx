'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Paper } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'
import MapGL, { MapRef, Marker } from 'react-map-gl'

import { PlaceIcon } from '@/components/place'
import { fontFamily, initLngLat } from '@/configs'
import { AccessibilityColorMap } from '@/constants'

import {
  Accessibility,
  BoundsQuery,
  Category,
  PlaceResponse,
} from '@/services/types'
import 'mapbox-gl/dist/mapbox-gl.css'

interface PinProps {
  onClick: (place: PlaceResponse) => void
  place: PlaceResponse
  active: boolean
}

interface MapProps {
  places: PlaceResponse[]
  bounds: BoundsQuery | null
}

const Pin = ({ place, active, onClick }: PinProps) => {
  const {
    lat = 0,
    lng = 0,
    accessibility = Accessibility.unknown,
    category = Category.sites,
  } = place

  return (
    <Marker
      onClick={() => onClick(place)}
      longitude={lng}
      latitude={lat}
      anchor="center"
    >
      <Paper
        className="animated"
        bg={AccessibilityColorMap[accessibility]}
        c="white"
        p={active ? 24 : 12}
        shadow="xl"
        radius="xl"
      >
        <PlaceIcon category={category} />
      </Paper>
    </Marker>
  )
}

export const Map = ({ places, bounds }: MapProps) => {
  const search = useSearchParams()
  const router = useRouter()
  const mapRef = useRef<MapRef>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const onMoveEnd = useCallback(() => {
    const { _ne, _sw } = mapRef.current?.getBounds()!
    const params = new URLSearchParams(search.toString())
    params.set('neLat', _ne.lat.toString())
    params.set('neLng', _ne.lng.toString())
    params.set('swLat', _sw.lat.toString())
    params.set('swLng', _sw.lng.toString())
    router.push(location.pathname + '?' + params.toString())
  }, [router, search])

  useEffect(() => {
    if (isLoaded && !bounds) {
      onMoveEnd()
    }
  }, [bounds, router, isLoaded, onMoveEnd])

  return (
    <MapGL
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      localFontFamily={fontFamily}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/navigation-day-v1"
      onLoad={() => {
        document
          .querySelector('button.mapboxgl-ctrl-attrib-button')
          ?.setAttribute('aria-label', 'info')
        setIsLoaded(true)
      }}
      initialViewState={{
        latitude: initLngLat.lat,
        longitude: initLngLat.lng,
        zoom: 12,
      }}
      onMoveEnd={onMoveEnd}
    >
      {places.map((place) => (
        <Pin
          onClick={() => router.push('/' + place?.id)}
          active={false}
          place={place}
          key={place?.id}
        />
      ))}
    </MapGL>
  )
}
