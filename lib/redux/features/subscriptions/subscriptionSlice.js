import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "@/data/user";

// Function to fetch subscriptions from the database
export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetchSubscriptions",
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
      const subscriptions = existingUser.subscriptions.map((subscription) => ({
        toolUrl: subscription.toolUrl,
        isActive: subscription.isActive,
        planType: subscription.planType,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
        endDate: subscription.endDate.toISOString(),
      }));
      console.log("subscriptions");
      return subscriptions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Function to load subscriptions into the Redux store
export const loadSubscriptions = (subscriptions) => (dispatch) => {
  dispatch(setSubscriptions(subscriptions));
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setSubscriptions: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    // Reducer to handle the deletion of a subscription
    deleteSubscriptionSuccess: (state, action) => {
      state.items = state.items.filter(
        (subscription) => subscription.stripeSubscriptionId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the reducer actions
export const { deleteSubscriptionSuccess, setSubscriptions } =
  subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
