import { getFeatures } from '@/services/feature'
import { redirect } from 'next/navigation'
import { FeatureForm } from './form'

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

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
