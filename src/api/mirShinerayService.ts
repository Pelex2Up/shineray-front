import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { AboutCompanyT } from "types/componentTypes";
import { ContactsT } from "./apiTypes";

export const MirShinerayService = createApi({
  reducerPath: "MirShinerayService",
  baseQuery: baseQuery(),
  tagTypes: ["aboutCompany", "mirShineray", "representativeOffice", "Contacts", "BecomeDealer"],
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
    fetchRepresentativeOfficePageData: build.query<AboutCompanyT, void>({
      query: () => ({
        url: `/about/about_us/`,
      }),
      providesTags: ["representativeOffice"],
    }),
    fetchContactsPageData: build.query<ContactsT, void>({
      query: () => ({
        url: `/contacts/`,
      }),
      providesTags: ["Contacts"],
    }),
    fetchBecomeDealerPageData: build.query<ContactsT, void>({
      query: () => ({
        url: `/dealers/become_dealer_page/`,
      }),
      providesTags: ["BecomeDealer"],
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useFetchAboutCompanyPageDataQuery,
  useLazyFetchAboutCompanyPageDataQuery,
  useLazyFetchMirShinerayPageDataQuery,
  useFetchMirShinerayPageDataQuery,
  useLazyFetchRepresentativeOfficePageDataQuery,
  useLazyFetchContactsPageDataQuery,
  useLazyFetchBecomeDealerPageDataQuery
} = MirShinerayService;
