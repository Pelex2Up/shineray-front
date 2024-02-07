import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { AboutCompanyT } from "types/componentTypes";

export const MirShinerayService = createApi({
  reducerPath: "MirShinerayService",
  baseQuery: baseQuery(),
  tagTypes: ["aboutCompany", "mirShineray"],
  endpoints: (build) => ({
    fetchAboutCompanyPageData: build.query<AboutCompanyT, void>({
      query: () => ({
        url: `/about/about_company/`,
      }),
      providesTags: ["aboutCompany"],
    }),
    fetchMirShinerayPageData: build.query<any, void>({
      query: () => ({
        url: `/about/about/`,
      }),
      providesTags: ["mirShineray"],
    }),
  }),
});

export const {
  useFetchAboutCompanyPageDataQuery,
  useFetchMirShinerayPageDataQuery,
} = MirShinerayService;
