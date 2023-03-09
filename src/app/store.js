import { configureStore } from '@reduxjs/toolkit';
import localStorageCartReducer from '../slices/localStorageCartSlice';

export const store = configureStore({
  reducer: {
    localStorageCart: localStorageCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
