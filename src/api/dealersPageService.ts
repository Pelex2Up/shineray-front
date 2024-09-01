import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { DealerMessageT, DealersPageT, IDealer } from "./apiTypes";

export const DealersPageService = createApi({
  reducerPath: "DealersPageService",
  baseQuery: baseQuery(),
  tagTypes: ["Dealers", "DealerDetail", "DealerDetailPage"],
  endpoints: (build) => ({
    fetchDealersPageData: build.query<DealersPageT, void>({
      query: () => ({
        url: `/dealers/dealers_page`,
      }),
      providesTags: ["Dealers"],
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
    sendDealerMessage: build.mutation<any, { dealerId: number, data: DealerMessageT }>({
      query: (args) => ({
        url: `/dealers/send-message/${args.dealerId}/`,
        method: 'POST',
        body: args.data
      })
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useSendDealerMessageMutation, useLazyFetchDealersPageDataQuery, useFetchDealerDataQuery, useLazyFetchDealerDetailsQuery } =
  DealersPageService;
