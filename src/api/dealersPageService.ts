import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import {
  DealerMessageT,
  DealersPageT,
  IDealer,
  IDealerCitiesResp,
} from "./apiTypes";

export const DealersPageService = createApi({
  reducerPath: "DealersPageService",
  baseQuery: baseQuery(),
  tagTypes: ["Dealers", "DealerDetail", "DealerDetailPage", "DealerCities"],
  endpoints: (build) => ({
    fetchDealersPageData: build.query<DealersPageT, void>({
      query: () => ({
        url: `/dealers/dealers_page`,
      }),
      providesTags: ["Dealers"],
    }),
    fetchDealersCities: build.query<IDealerCitiesResp, void>({
      query: () => ({
        url: `/dealers/dealer-cities/`,
      }),
      providesTags: ["DealerCities"],
    }),
    fetchDealersByCity: build.mutation<IDealer[], string>({
      query: (city) => ({
        url: `/dealers/dealers/search/?city=${city}`,
        method: "GET",
      }),
    }),
    fetchDealerData: build.query<any, { id: number }>({
      query: (id) => ({
        url: `/models_page/${id}/`,
      }),
      providesTags: ["DealerDetail"],
    }),
    fetchDealerDetails: build.query<IDealer, number>({
      query: (id) => ({
        url: `/dealers/dealers/${id}/`,
      }),
      providesTags: ["DealerDetailPage"],
    }),
    sendDealerMessage: build.mutation<
      any,
      { dealerId: number; data: DealerMessageT }
    >({
      query: (args) => ({
        url: `/dealers/send-message/${args.dealerId}/`,
        method: "POST",
        body: args.data,
      }),
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useSendDealerMessageMutation,
  useLazyFetchDealersPageDataQuery,
  useFetchDealerDataQuery,
  useLazyFetchDealerDetailsQuery,
  useFetchDealersCitiesQuery,
  useFetchDealersByCityMutation,
} = DealersPageService;
