import { BoundsInput, PlaceType } from '@/types'
import { LngLat } from 'mapbox-gl'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type MapContextType = {
  places: PlaceType[] | null
  setPlaces: Dispatch<SetStateAction<PlaceType[] | null>>
  activePlace: PlaceType | null
  setActivePlace: Dispatch<SetStateAction<PlaceType | null>>
  initMapPosition: LngLat | null
  setInitMapPosition: Dispatch<SetStateAction<LngLat | null>>
  bounds: BoundsInput | null
  setBounds: Dispatch<SetStateAction<BoundsInput | null>>
}

export const MapContext = createContext<MapContextType>({
  places: [],
  setPlaces: () => {},
  activePlace: null,
  setActivePlace: () => {},
  initMapPosition: null,
  setInitMapPosition: () => {},
  bounds: null,
  setBounds: () => {},
})

export const MapProvider = ({ children }: PropsWithChildren) => {
  const [places, setPlaces] = useState<PlaceType[] | null>(null)
  const [activePlace, setActivePlace] = useState<PlaceType | null>(null)
  const [bounds, setBounds] = useState<BoundsInput | null>(null)
  const [initMapPosition, setInitMapPosition] = useState<LngLat | null>(null)

  return (
    <MapContext.Provider
      value={{
        places,
        setPlaces,
        activePlace,
        setActivePlace,
        bounds,
        setBounds,
        initMapPosition,
        setInitMapPosition,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMap = () => useContext(MapContext)
