import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { Action, PreloadedStateShapeFromReducersMapObject, Reducer } from 'redux'
import type { PersistConfig, PersistState } from 'redux-persist'
// eslint-disable-next-line
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import * as services from '../api/index'

declare module 'redux-persist' {
  export function persistReducer<S, A extends Action = Action, P = S>(
    config: PersistConfig<S>,
    baseReducer: Reducer<S, A, P>,
  ): Reducer<S & { _persist: PersistState }, A, P & { _persist?: PersistState }>
}

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

export const setupStore = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) => {
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
