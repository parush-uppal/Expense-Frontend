import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//Fetch All Exp
export const fetchAccountStatsAction = createAsyncThunk(
  "stats/details",
  async (stats, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/stats`, config);
      console.log(data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//--------------
//slices
//--------------
const incomeSlices = createSlice({
  name: "statistics",
  initialState: {},
  extraReducers: builder => {
    //fetch all
    builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
      state.statsLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
      state.statsLoading = false;
      state.stats = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isIncomeCreated = false;
    });
    builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
      state.statsLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default incomeSlices.reducer;
