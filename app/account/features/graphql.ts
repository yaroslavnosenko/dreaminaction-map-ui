import { Var, jql } from '@/utils'
import { gql } from '@apollo/client'

export const featuresQuery = gql(
  jql({
    query: {
      features: {
        id: true,
        name: true,
      },
    },
  })
)

export const createFeatureMutation = gql(
  jql({
    mutation: {
      __variables: {
        input: 'FeatureInput!',
      },
      createFeature: {
        __args: {
          input: new Var('input'),
        },
      },
    },
  })
)

export const updateFeatureMutation = gql(
  jql({
    mutation: {
      __variables: {
        id: 'ID!',
        input: 'FeatureInput!',
      },
      updateFeature: {
        __args: {
          id: new Var('id'),
          input: new Var('input'),
        },
      },
    },
  })
)

export const deleteFeatureMutation = gql(
  jql({
    mutation: {
      __variables: {
        id: 'ID!',
      },
      deleteFeature: {
        __args: {
          id: new Var('id'),
        },
      },
    },
  })
)
