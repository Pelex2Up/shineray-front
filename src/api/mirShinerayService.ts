import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { AboutCompanyT, IAbout } from "types/componentTypes";

export const MirShinerayService = createApi({
  reducerPath: "MirShinerayService",
  baseQuery: baseQuery(),
  tagTypes: ["aboutCompany", "mirShineray", "representativeOffice"],
  endpoints: (build) => ({
    fetchAboutCompanyPageData: build.query<AboutCompanyT, void>({
      query: () => ({
        url: `/about/about_company`,
      }),
      providesTags: ["aboutCompany"],
    }),
    fetchMirShinerayPageData: build.query<any, void>({
      query: () => ({
        url: `/about/about`,
      }),
      providesTags: ["mirShineray"],
    }),
    fetchRepresentativeOfficePageData: build.query<IAbout, void>({
      query: () => ({
        url: `/about/about_us`,
      }),
      providesTags: ["representativeOffice"],
    }),
  }),
});

export const {
  useFetchAboutCompanyPageDataQuery,
  useLazyFetchAboutCompanyPageDataQuery,
  useLazyFetchMirShinerayPageDataQuery,
  useFetchMirShinerayPageDataQuery,
  useLazyFetchRepresentativeOfficePageDataQuery
} = MirShinerayService;
