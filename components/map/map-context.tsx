'use client'

import { createContext, PropsWithChildren, useState } from 'react'

import { Place } from '@/types'

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
