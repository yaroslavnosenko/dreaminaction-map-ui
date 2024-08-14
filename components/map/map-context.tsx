'use client'

import { Place } from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'

type MapContextProps = {
  places: Place[]
  setPlaces: (places: Place[]) => void
}

export const MapContext = createContext<MapContextProps>({
  places: [],
  setPlaces: () => {},
})

export const MapPrivider = ({ children }: PropsWithChildren) => {
  const [places, setPlaces] = useState<Place[]>([])
  return (
    <MapContext.Provider value={{ places, setPlaces }}>
      {children}
    </MapContext.Provider>
  )
}
