import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTools } from "@/data/tools";

export const fetchTools = createAsyncThunk(
  "tools/fetchTools",
  async (_, { rejectWithValue }) => {
    try {
      const tools = await getTools();
      return tools;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const toolsSlice = createSlice({
  name: "tools",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTools.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default toolsSlice.reducer;
