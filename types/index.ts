export * from './generated/gql'
import { Place } from './generated/gql'

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export type PlaceType = DeepPartial<Place>
