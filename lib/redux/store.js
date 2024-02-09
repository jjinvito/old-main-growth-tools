// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import subscriptionsSlice from './features/subscriptions/subscriptionSlice';

export const makeStore = () => configureStore({
  reducer: {
    subscriptions: subscriptionsSlice,
    // Add other reducers here
  },
});
