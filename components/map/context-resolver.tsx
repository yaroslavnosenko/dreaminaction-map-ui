'use client'

import { useContext, useEffect } from 'react'

import { MapContext } from '@/components/map'
import { Place } from '@/types'

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
