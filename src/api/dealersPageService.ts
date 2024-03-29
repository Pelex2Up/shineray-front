import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { DealersPageT, IDealer } from "./apiTypes";

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
  }),
  refetchOnMountOrArgChange: true,
});

export const { useLazyFetchDealersPageDataQuery, useFetchDealerDataQuery, useLazyFetchDealerDetailsQuery } =
  DealersPageService;
