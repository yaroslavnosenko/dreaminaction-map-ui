import { PlaceIcon } from '@/components/place'
import { fontFamily } from '@/configs'
import { AccessibilityColorMap } from '@/constants'
import { Accessibility, Category, DeepPartial, Place } from '@/types'
import { Paper } from '@mantine/core'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'
import MapGL, { Marker } from 'react-map-gl'

type PlaceType = DeepPartial<Place>

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

type MapProps = {
  places: PlaceType[]
}

export const Map = ({ places }: MapProps) => {
  const [active, setActive] = useState<PlaceType | null>(null)
  const [viewport, setViewport] = useState({
    latitude: 48.621025,
    longitude: 22.288229,
    zoom: 12,
  })

  const onPinClick = (place: PlaceType) => {
    const { lat = 0, lng = 0 } = place
    setActive(place)
    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
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
      {places.map((place) => (
        <Pin
          onClick={onPinClick}
          active={place.name === active?.name}
          place={place}
          key={place.id}
        />
      ))}
    </MapGL>
  )
}
