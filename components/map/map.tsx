'use client'

import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { Paper } from '@mantine/core'
import { useParams, useRouter } from 'next/navigation'
import MapGL, { MapRef, Marker } from 'react-map-gl'

import { PlaceIcon } from '@/components/place'
import { fontFamily, initLngLat } from '@/configs'
import { AccessibilityColorMap } from '@/constants'

import { Accessibility, Bounds, Category, Place } from '@/types'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapContext } from './map-context'

interface PinProps {
  onClick: (place: Place) => void
  place: Place
  active: boolean
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

export const Map = () => {
  const { places } = useContext(MapContext)
  const { id } = useParams()
  const router = useRouter()
  const mapRef = useRef<MapRef>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const onMoveEnd = useCallback(() => {
    const { _ne, _sw } = mapRef.current?.getBounds()!
    const bounds: Bounds = {
      swLat: _sw.lat,
      swLng: _sw.lng,
      neLat: _ne.lat,
      neLng: _ne.lng,
    }
    console.log(bounds)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      onMoveEnd()
    }
  }, [isLoaded, onMoveEnd])

  return (
    <MapGL
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      localFontFamily={fontFamily}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
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
          active={id === place.id}
          place={place}
          key={place?.id}
        />
      ))}
    </MapGL>
  )
}
