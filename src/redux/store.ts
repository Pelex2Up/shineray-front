import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
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
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
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
      ),
  });
};

export const store = setupStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
