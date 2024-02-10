import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi'
import { HomePageRespT } from './apiTypes'

export const HomePageService = createApi({
  reducerPath: 'HomePageService',
  baseQuery: baseQuery(),
  tagTypes: ['home'],
  endpoints: build => ({
    fetchHomePageData: build.query<HomePageRespT, void>({
      query: () => ({
        url: `/home`,
      }),
      providesTags: ['home'],
    }),
  }),
})

export const { useFetchHomePageDataQuery, useLazyFetchHomePageDataQuery } = HomePageService