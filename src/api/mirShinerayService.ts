import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { AboutCompanyT } from "types/componentTypes";

export const MirShinerayService = createApi({
  reducerPath: "MirShinerayService",
  baseQuery: baseQuery(),
  tagTypes: ["aboutCompany"],
  endpoints: (build) => ({
    fetchAboutCompanyPageData: build.query<AboutCompanyT, void>({
      query: () => ({
        url: `/about/about_company/`,
      }),
      providesTags: ["aboutCompany"],
    }),
  }),
});

export const { useFetchAboutCompanyPageDataQuery } = MirShinerayService;
