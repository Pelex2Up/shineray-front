import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { DealersPageT } from "./apiTypes";
import { REHYDRATE } from "redux-persist";
import { Action } from "@reduxjs/toolkit";

type RootState = any; // normally inferred from state

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
  key: string;
  payload: RootState;
  err: unknown;
} {
  return action.type === REHYDRATE;
}

export const DealersPageService = createApi({
  reducerPath: "DealersPageService",
  baseQuery: baseQuery(),
  // extractRehydrationInfo(action, { reducerPath }): any {
  //   if (isHydrateAction(action)) {
  //     if (action.key === "root") {
  //       return action.payload;
  //     }
  //     return action.payload[DealersPageService.reducerPath];
  //   }
  // },
  tagTypes: ["Dealers", "DealerDetail"],
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
  }),
});

export const { useLazyFetchDealersPageDataQuery, useFetchDealerDataQuery } =
  DealersPageService;
