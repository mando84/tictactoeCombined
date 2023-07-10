import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recordService from "./recordService";

const initialState = {
  records: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createRecord = createAsyncThunk(
  "records/create",
  async (recordData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recordService.createRecord(recordData, token);
    } catch (error) {
      const message =
        error.message(
          error.reponse && error.response.data && error.response.data.message
        ) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRecords = createAsyncThunk(
  "records/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recordService.getRecords(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.records.push(action.payload);
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.records = action.payload;
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.records = action.payload;
      });
  },
});

export const { reset } = recordSlice.actions;
export default recordSlice.reducer;
