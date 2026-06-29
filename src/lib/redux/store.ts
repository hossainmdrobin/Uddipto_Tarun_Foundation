import { configureStore } from '@reduxjs/toolkit';
import baseApi from './api/baseApi';

// Import API endpoints to ensure they're injected
import './api/loanApi';
import './api/userApi';

// Configure the Redux store with RTK Query API
export const store = configureStore({
  reducer: {
    // Add RTK Query API reducer (baseApi handles all endpoints)
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
