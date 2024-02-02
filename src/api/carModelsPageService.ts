import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi'
import { CategoryT } from './apiTypes'


export const CarModelsPageService = createApi({
  reducerPath: 'CarModelsPageService',
  baseQuery: baseQuery(),
  tagTypes: ['CarModels'],
  endpoints: build => ({
    fetchCategoryData: build.query<CategoryT[], void>({
      query: () => ({
        url: `/category/`,
      }),
      providesTags: ['CarModels'],
    }),
  }),
})

export const { useFetchCategoryDataQuery } = CarModelsPageService