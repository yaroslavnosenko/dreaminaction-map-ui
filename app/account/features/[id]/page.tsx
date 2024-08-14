import { redirect } from 'next/navigation'

import { getFeatures } from '@/services/feature'

import { FeatureForm } from './form'

import { PageProps } from '@/types'

export default async function SaveFeature({ params: { id } }: PageProps) {
  const isCreate = id === 'new'
  let feature = undefined
  if (!isCreate) {
    const features = await getFeatures()
    feature = features.find((feat) => feat.id === id)
    if (!feature) {
      return redirect('/account/features')
    }
  }
  return <FeatureForm isCreate={isCreate} feature={feature} />
}
