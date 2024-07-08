import { useEffect, useState } from 'react'

import { StorageKeys } from '@/constants'
import { client } from '@/graphql'
import { Query, QueryUserArgs, User } from '@/types'
import { Var, jql } from '@/utils'
import { gql } from '@apollo/client'

const userQuery = gql(
  jql({
    query: {
      __variables: {
        id: 'ID!',
      },
      user: {
        __args: {
          id: new Var('id'),
        },
        id: true,
        role: true,
      },
    },
  })
)

const parseJwt = (token: string) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload)
}

export const useMe = () => {
  const [user, setUser] = useState<User | undefined | null>(undefined)
  const auth =
    typeof window !== 'undefined'
      ? localStorage.getItem(StorageKeys.Auth)
      : undefined

  useEffect(() => {
    if (!auth) {
      setUser(null)
      return
    }
    const payload = parseJwt(auth)
    client
      .query<Query, QueryUserArgs>({
        query: userQuery,
        variables: { id: payload.uid as string },
      })
      .then(({ data: { user } }) => setUser(user))
  }, [auth])

  return user
}
