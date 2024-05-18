import { PlaceIcon } from '@/components/place'
import { fontFamily } from '@/configs'
import { AccessibilityColorMap } from '@/constants'
import { places } from '@/mocks'
import { Place } from '@/types'
import { Paper } from '@mantine/core'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'
import MapGL, { Marker } from 'react-map-gl'

type PinProps = {
  onClick: (place: Place) => void
  place: Place
  active: boolean
}

const Pin = ({ place, active, onClick }: PinProps) => {
  return (
    <Marker
      onClick={() => onClick(place)}
      longitude={place.lng}
      latitude={place.lat}
      anchor="center"
    >
      <Paper
        className="animated"
        bg={AccessibilityColorMap[place.accessibility]}
        c="white"
        p={active ? 24 : 12}
        shadow="xl"
        radius="xl"
      >
        <PlaceIcon placeType={place.type} />
      </Paper>
    </Marker>
  )
}

export const Map = () => {
  const [active, setActive] = useState<Place | null>(null)
  const _places = places
  const [viewport, setViewport] = useState({
    latitude: 48.621025,
    longitude: 22.288229,
    zoom: 12,
  })

  const onPinClick = (place: Place) => {
    setActive(place)
    setViewport((prev) => ({
      ...prev,
      latitude: place.lat,
      longitude: place.lng,
    }))
  }

  return (
    <MapGL
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      localFontFamily={fontFamily}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/navigation-day-v1"
      onLoad={() => {
        document
          .querySelector('button.mapboxgl-ctrl-attrib-button')
          ?.setAttribute('aria-label', 'info')
      }}
      {...viewport}
    >
      {_places.map((place) => (
        <Pin
          onClick={onPinClick}
          active={place.name === active?.name}
          place={place}
          key={place.name}
        />
      ))}
    </MapGL>
  )
}
