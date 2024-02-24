// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import subscriptionsSlice from "./features/subscriptions/subscriptionSlice";
import toolsSlice from "./features/tools/toolsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      subscriptions: subscriptionsSlice,
      tools: toolsSlice,
    },
  });
