import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { OwnersPageT, TechDocsResponseT } from "./apiTypes";

export const OwnersService = createApi({
  reducerPath: "OwnersService",
  baseQuery: baseQuery(),
  tagTypes: ["ownersData", "warranty", "techDocs", "techSupport"],
  endpoints: (build) => ({
    fetchForOwnersData: build.query<OwnersPageT, void>({
      query: () => ({
        url: `/owners/owners/`,
      }),
      providesTags: ["ownersData"],
    }),
    fetchWarrantyData: build.query<any, void>({
      query: () => ({
        url: `/owners/warranty/`,
      }),
      providesTags: ["warranty"],
    }),
    fetchTechDocsData: build.query<TechDocsResponseT, void>({
      query: () => ({
        url: `/owners/documents/`,
      }),
      providesTags: ["techDocs"],
    }),
    fetchTechSupportData: build.query<any, void>({
      query: () => ({
        url: `/owners/maintenance/`,
      }),
      providesTags: ["techSupport"],
    }),
  }),
});

export const {
  useLazyFetchForOwnersDataQuery,
  useLazyFetchTechDocsDataQuery,
  useLazyFetchTechSupportDataQuery,
  useLazyFetchWarrantyDataQuery,
} = OwnersService;
