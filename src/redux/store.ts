import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import * as services from '../api/index'

export const rootReducer = combineReducers({
  [services.HeaderService.reducerPath]: services.HeaderService.reducer,
  [services.HomePageService.reducerPath]: services.HomePageService.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat(services.HeaderService.middleware, services.HomePageService.middleware),
  })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
