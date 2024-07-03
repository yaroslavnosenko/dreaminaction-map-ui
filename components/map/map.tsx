import { useContext, useRef } from 'react'

import { Paper } from '@mantine/core'
import MapGL, { MapRef, Marker } from 'react-map-gl'

import { MapContext } from '@/components/map'
import { PlaceIcon } from '@/components/place'
import { fontFamily } from '@/configs'
import { AccessibilityColorMap } from '@/constants'

import { Accessibility, Category, PlaceType } from '@/types'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRouter } from 'next/navigation'

type PinProps = {
  onClick: (place: PlaceType) => void
  place: PlaceType
  active: boolean
}

const Pin = ({ place, active, onClick }: PinProps) => {
  const {
    lat = 0,
    lng = 0,
    accessibility = Accessibility.Unknown,
    category = Category.Sites,
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
  const { places, initMapPosition, activePlace } = useContext(MapContext)
  const mapRef = useRef<MapRef>(null)
  const router = useRouter()

  const onMoveEnd = () => {}

  const updateMap = () => {
    if (initMapPosition) {
      const { lat, lng } = initMapPosition
      mapRef.current?.flyTo({
        center: { lat, lng },
        zoom: 12,
        speed: 20,
      })
    }
  }

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
        updateMap()
      }}
      onMoveEnd={onMoveEnd}
    >
      {places.map((place) => (
        <Pin
          onClick={() => router.push('/' + place.id)}
          active={place.id === activePlace?.id}
          place={place}
          key={place.id}
        />
      ))}
    </MapGL>
  )
}
