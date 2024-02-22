import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import * as services from "../api/index";

export const rootReducer = combineReducers({
  [services.HeaderService.reducerPath]: services.HeaderService.reducer,
  [services.HomePageService.reducerPath]: services.HomePageService.reducer,
  [services.CarModelsPageService.reducerPath]:
    services.CarModelsPageService.reducer,
  [services.CarDetailsPageService.reducerPath]:
    services.CarDetailsPageService.reducer,
  [services.MirShinerayService.reducerPath]:
    services.MirShinerayService.reducer,
  [services.DealersPageService.reducerPath]:
    services.DealersPageService.reducer,
  [services.NewsPageService.reducerPath]: services.NewsPageService.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      services.HeaderService.middleware,
      services.HomePageService.middleware,
      services.CarModelsPageService.middleware,
      services.CarDetailsPageService.middleware,
      services.MirShinerayService.middleware,
      services.DealersPageService.middleware,
      services.NewsPageService.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
