import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi'
import { HeaderRespT } from './apiTypes'

export const HeaderService = createApi({
  reducerPath: 'HeaderService',
  baseQuery: baseQuery(),
  tagTypes: ['header'],
  endpoints: build => ({
    fetchHeaderData: build.query<HeaderRespT, void>({
      query: () => ({
        url: `/header`,
      }),
      providesTags: ['header'],
    }),
  }),
})

export const { useFetchHeaderDataQuery } = HeaderService
