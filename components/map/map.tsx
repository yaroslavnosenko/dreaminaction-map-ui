import { useContext, useEffect, useMemo, useRef, useState } from 'react'

import { Paper } from '@mantine/core'
import { useRouter } from 'next/navigation'
import MapGL, { MapRef, Marker } from 'react-map-gl'

import { FilterContext, MapContext } from '@/components/map'
import { PlaceIcon } from '@/components/place'
import { fontFamily } from '@/configs'
import { AccessibilityColorMap } from '@/constants'

import { Accessibility, Category, PlaceType } from '@/types'
import { filterPlaces } from '@/utils'
import 'mapbox-gl/dist/mapbox-gl.css'

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
  const router = useRouter()
  const mapRef = useRef<MapRef>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const { categories, accessibilities } = useContext(FilterContext)
  const { places, activePlace, initMapPosition, setBounds } =
    useContext(MapContext)

  const extendedPlaces = useMemo(() => {
    if (!places) return []
    const filtered = filterPlaces(places, categories, accessibilities)
    if (!activePlace) return filtered
    return [...filtered.filter(({ id }) => id !== activePlace.id), activePlace]
  }, [places, activePlace, categories, accessibilities])

  useEffect(() => {
    if (isLoaded && initMapPosition && mapRef.current) {
      mapRef.current.flyTo({ center: initMapPosition, zoom: 12, speed: 20 })
    }
  }, [isLoaded, initMapPosition, mapRef])

  const onMoveEnd = () => setBounds(mapRef.current?.getBounds()!)

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
      onMoveEnd={onMoveEnd}
    >
      {extendedPlaces.map((place) => (
        <Pin
          onClick={() => router.push('/' + place?.id)}
          active={place?.id === activePlace?.id}
          place={place!}
          key={place?.id}
        />
      ))}
    </MapGL>
  )
}
