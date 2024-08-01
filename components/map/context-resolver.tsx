'use client'

import { Place } from '@/types'
import { useContext, useEffect } from 'react'
import { MapContext } from './map-context'

type Props = {
  places: Place[]
  auth: boolean
}

export const ContextResolver = ({ places, auth }: Props) => {
  const { setAuth, setPlaces } = useContext(MapContext)

  useEffect(() => {
    setAuth(auth)
    setPlaces(places)
  }, [auth, places, setAuth, setPlaces])

  return null
}
