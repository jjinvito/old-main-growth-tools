import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "@/data/user";

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    const includeOptions = {
      subscriptions: {
        include: {
          tool: {
            include: {
              deals: true,
            },
          },
        },
      },
    };

    const { rejectWithValue } = thunkAPI;
    try {
      const user = await getUserById(userId, includeOptions);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const singleUserSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default singleUserSlice.reducer;
