// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import subscriptionsSlice from "./features/subscriptions/subscriptionSlice";
import toolsSlice from "./features/tools/toolsSlice";
import singleToolSlice from "@/lib/redux/features/tools/singleToolSlice";
import singleUserSlice from "@/lib/redux/features/user/userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      subscriptions: subscriptionsSlice,
      tools: toolsSlice,
      tool: singleToolSlice,
      user: singleUserSlice,
    },
  });
