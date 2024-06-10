import { DeepPartial, Place } from '@/types'
import { createContext } from 'react'

type MapContextType = {
  places: DeepPartial<Place>[]
}

export const MapContext = createContext<MapContextType>({
  places: [],
})
