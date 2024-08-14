'use client'

import { Place } from '@/types'
import { useContext, useEffect } from 'react'
import { MapContext } from './map-context'

type Props = {
  places: Place[]
}

export const ContextResolver = ({ places }: Props) => {
  const { setPlaces } = useContext(MapContext)

  useEffect(() => {
    setPlaces(places)
  }, [places, setPlaces])

  return null
}
