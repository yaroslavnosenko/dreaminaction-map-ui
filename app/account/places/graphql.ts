import { Var, jql } from '@/utils'
import { gql } from '@apollo/client'

const baseFields = {
  id: true,
  name: true,
  address: true,
  accessibility: true,
  category: true,
}

export const myPlacesQuery = gql(
  jql({
    query: {
      __variables: {
        id: 'ID!',
      },
      user: {
        __args: {
          id: new Var('id'),
        },
        places: baseFields,
      },
    },
  })
)

export const placeQuery = gql(
  jql({
    query: {
      __variables: {
        id: 'ID!',
      },
      features: {
        id: true,
        name: true,
      },
      place: {
        __args: {
          id: new Var('id'),
        },
        ...baseFields,
        availableFeatures: { id: true },
        unavailableFeatures: { id: true },
      },
    },
  })
)

export const placeWithOwnerQuery = gql(
  jql({
    query: {
      __variables: {
        id: 'ID!',
      },
      features: {
        id: true,
        name: true,
      },
      place: {
        __args: {
          id: new Var('id'),
        },
        ...baseFields,
        availableFeatures: { id: true },
        unavailableFeatures: { id: true },
        owner: { id: true, email: true },
      },
    },
  })
)
