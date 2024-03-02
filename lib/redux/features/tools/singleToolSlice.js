import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToolById } from "@/data/tools";

// New async thunk for fetching a single tool by ID
export const fetchToolById = createAsyncThunk(
  "tool/fetchToolById",
  async (toolId, { rejectWithValue }) => {
    try {
      const tool = await getToolById(toolId);
      // Serialize the createdAt field to a string representation
      tool.createdAt = tool.createdAt.toISOString(); // or any other desired format
      return tool;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const singleToolSlice = createSlice({
  name: "tool",
  initialState: {
    item: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchToolById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchToolById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default singleToolSlice.reducer;
