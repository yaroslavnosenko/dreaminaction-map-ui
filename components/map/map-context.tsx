'use client'

import { Place } from '@/types'
import { createContext, PropsWithChildren, useState } from 'react'

type MapContextProps = {
  places: Place[]
  auth: boolean
  setPlaces: (places: Place[]) => void
  setAuth: (auth: boolean) => void
}

export const MapContext = createContext<MapContextProps>({
  auth: false,
  places: [],
  setPlaces: () => {},
  setAuth: () => {},
})

export const MapPrivider = ({ children }: PropsWithChildren) => {
  const [places, setPlaces] = useState<Place[]>([])
  const [auth, setAuth] = useState<boolean>(false)
  return (
    <MapContext.Provider value={{ places, auth, setAuth, setPlaces }}>
      {children}
    </MapContext.Provider>
  )
}
