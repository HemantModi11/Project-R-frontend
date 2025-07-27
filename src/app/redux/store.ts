import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from '@/state/api';
import globalReducer from '@/state/global';

export const makeStore = () => {
  return configureStore({
    reducer: {
      global: globalReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;