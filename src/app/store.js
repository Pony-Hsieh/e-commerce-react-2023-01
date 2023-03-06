import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/counter/counterSlice';
import localStorageCartReducer from '../slices/localStorageCartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    localStorageCart: localStorageCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
