import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { ICar } from "types/componentTypes";

export const CarDetailsPageService = createApi({
  reducerPath: "CarDetailsPageService",
  baseQuery: baseQuery(),
  tagTypes: ["CarDetails"],
  endpoints: (build) => ({
    fetchCarModelData: build.query<ICar, number | string>({
      query: (id) => ({
        url: `/car_model/${id}`,
      }),
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useLazyFetchCarModelDataQuery } = CarDetailsPageService;
