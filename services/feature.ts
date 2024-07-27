import { features } from '@/mocks'
import { FeatureResponse } from './types'

export const getFeatures = async (): Promise<FeatureResponse[]> => {
  return features
}
