import { fontFamily } from '@/configs'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapGL from 'react-map-gl'

export const Map = () => (
  <MapGL
    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    initialViewState={{
      latitude: 48.621025,
      longitude: 22.288229,
      zoom: 12.5,
    }}
    localFontFamily={fontFamily}
    style={{ width: '100%', height: '100%' }}
    mapStyle="mapbox://styles/mapbox/navigation-day-v1"
    onLoad={() => {
      document
        .querySelector('button.mapboxgl-ctrl-attrib-button')
        ?.setAttribute('aria-label', 'info')
    }}
  />
)
