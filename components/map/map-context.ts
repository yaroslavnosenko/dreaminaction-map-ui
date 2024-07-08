import { PlaceType } from '@/types'
import { LngLatBounds, LngLatLike } from 'mapbox-gl'
import { Dispatch, SetStateAction, createContext } from 'react'

type MapContextType = {
  places: PlaceType[] | null
  setPlaces: Dispatch<SetStateAction<PlaceType[] | null>>
  activePlace: PlaceType | null
  setActivePlace: Dispatch<SetStateAction<PlaceType | null>>
  initMapPosition: LngLatLike | null
  setInitMapPosition: Dispatch<SetStateAction<LngLatLike | null>>
  bounds: LngLatBounds | null
  setBounds: Dispatch<SetStateAction<LngLatBounds | null>>
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
