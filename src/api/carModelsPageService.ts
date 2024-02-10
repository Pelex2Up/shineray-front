import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { CategoryT } from "./apiTypes";

export const CarModelsPageService = createApi({
  reducerPath: "CarModelsPageService",
  baseQuery: baseQuery(),
  tagTypes: ["CarModels", "ModelsPageData"],
  endpoints: (build) => ({
    fetchCategoryData: build.query<CategoryT[], void>({
      query: () => ({
        url: `/category`,
      }),
      providesTags: ["CarModels"],
    }),
    useFetchModelsPageData: build.query<{ body: { categories: CategoryT[]; content: string } }, void>({
      query: () => ({
        url: `/models_page`,
      }),
      providesTags: ["ModelsPageData"],
    }),
  }),
});

export const { useFetchCategoryDataQuery, useUseFetchModelsPageDataQuery } =
  CarModelsPageService;
