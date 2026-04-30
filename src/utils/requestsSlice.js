import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const userIdToRemove = action.payload;
      return state.filter((user) => user._id !== userIdToRemove);
    },
    removeRequests: (state, action) => {
      return null;
    },
  },
});

export const { addRequests, removeRequest, removeRequests } =
  requestsSlice.actions;
export default requestsSlice.reducer;
