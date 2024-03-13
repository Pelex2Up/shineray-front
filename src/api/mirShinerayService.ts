import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { AboutCompanyT } from "types/componentTypes";
import { ContactsT, ILegalContent, LegalInfoT } from "./apiTypes";

export const MirShinerayService = createApi({
  reducerPath: "MirShinerayService",
  baseQuery: baseQuery(),
  tagTypes: [
    "aboutCompany",
    "mirShineray",
    "representativeOffice",
    "Contacts",
    "BecomeDealer",
    "LegalInfo",
    "LegalInfoDetails",
  ],
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
    sendContacts: build.mutation<any, FormData>({
      query: (data) => ({
        url: "/add_contact/",
        method: "POST",
        body: data,
      }),
    }),
    fetchBecomeDealerPageData: build.query<ContactsT, void>({
      query: () => ({
        url: `/dealers/become_dealer_page/`,
      }),
      providesTags: ["BecomeDealer"],
    }),
    sendBecomeDealerForm: build.mutation<any, FormData>({
      query: (data) => ({
        url: "/dealers/become_dealer/",
        method: "POST",
        body: data,
      }),
    }),
    fetchLegalInfoPageData: build.query<LegalInfoT, void>({
      query: () => ({
        url: `/about/legal_informations/`,
      }),
      providesTags: ["LegalInfo"],
    }),
    fetchLegalInfoData: build.query<ILegalContent, number>({
      query: (id) => ({
        url: `/about/legal_informations/${id}`,
      }),
      providesTags: ["LegalInfoDetails"],
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
  useLazyFetchBecomeDealerPageDataQuery,
  useLazyFetchLegalInfoPageDataQuery,
  useLazyFetchLegalInfoDataQuery,
  useSendContactsMutation,
  useSendBecomeDealerFormMutation,
} = MirShinerayService;
