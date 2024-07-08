import { Var, jql } from '@/utils'
import { gql } from '@apollo/client'

export const placesQuery = gql(
  jql({
    query: {
      __variables: {
        input: 'LocationInput!',
      },
      placesByLocation: {
        __args: {
          input: new Var('input'),
        },
        id: true,
        name: true,
        address: true,
        accessibility: true,
        category: true,
        featuresCount: true,
        lat: true,
        lng: true,
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
      place: {
        __args: {
          id: new Var('id'),
        },
        id: true,
        name: true,
        address: true,
        accessibility: true,
        category: true,
        lat: true,
        lng: true,
        // TODO ADD Params
      },
    },
  })
)
