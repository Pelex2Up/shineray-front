import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { INews, NewsPageT } from "./apiTypes";

export const NewsPageService = createApi({
  reducerPath: "NewsPageService",
  baseQuery: baseQuery(),
  tagTypes: ["allNews", "newsDetails"],
  endpoints: (build) => ({
    fetchNewsPageData: build.query<NewsPageT, void>({
      query: () => ({
        url: `/news`,
      }),
      providesTags: ["allNews"],
    }),
    fetchNewsDetailsData: build.query<INews, number>({
      query: (arg) => ({
        url: `/news/${arg}`,
      }),
      providesTags: ["newsDetails"],
    }),
  }),
});

export const {
  useLazyFetchNewsPageDataQuery,
  useLazyFetchNewsDetailsDataQuery,
} = NewsPageService;
