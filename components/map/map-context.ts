import { PlaceType } from '@/types'
import { Dispatch, SetStateAction, createContext } from 'react'

type MapContextType = {
  places: PlaceType[]
  setPlaces: Dispatch<SetStateAction<PlaceType[]>>
  activePlace: PlaceType | null
  setActivePlace: Dispatch<SetStateAction<PlaceType | null>>
  initMapPosition: { lat: number; lng: number } | null
  setInitMapPosition: Dispatch<
    SetStateAction<{ lat: number; lng: number } | null>
  >
}

export const MapContext = createContext<MapContextType>({
  places: [],
  setPlaces: () => {},
  activePlace: null,
  setActivePlace: () => {},
  initMapPosition: null,
  setInitMapPosition: () => {},
})
