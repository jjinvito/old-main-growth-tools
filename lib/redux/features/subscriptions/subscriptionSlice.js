import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "@/data/user";

export const loadSubscriptions = createAsyncThunk(
  "subscriptions/loadSubscriptions",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const existingUser = await getUserById(userId, {
        subscriptions: true,
      });
      if (!existingUser) {
        throw new Error("User not found");
      }
      const subscriptions = existingUser.subscriptions.map(subscription => ({
        toolUrl: subscription.toolUrl,
        isActive: subscription.isActive,
        planType: subscription.planType,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
        endDate: subscription.endDate.toISOString(),
      }));
      return subscriptions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Reducer to handle the deletion of a subscription
    deleteSubscriptionSuccess: (state, action) => {
      state.items = state.items.filter(subscription => subscription.stripeSubscriptionId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubscriptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadSubscriptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadSubscriptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the reducer actions
export const { deleteSubscriptionSuccess } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
