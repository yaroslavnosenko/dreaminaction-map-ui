'use client'

import { useContext, useRef } from 'react'

import { Paper } from '@mantine/core'
import { useParams, useRouter } from 'next/navigation'
import MapGL, { MapRef, Marker } from 'react-map-gl'

import { MapContext } from '@/components/map'
import { PlaceIcon } from '@/components/place'
import { fontFamily, startPoint } from '@/configs'
import { AccessibilityColorMap } from '@/constants'

import { Accessibility, Category, Place } from '@/types'
import 'mapbox-gl/dist/mapbox-gl.css'

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
      style={{ zIndex: active ? 1 : 0 }}
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
      }}
      initialViewState={{
        latitude: startPoint.lat,
        longitude: startPoint.lng,
        zoom: 12,
      }}
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
