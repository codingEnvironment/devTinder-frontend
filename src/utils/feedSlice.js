import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const userIdToRemove = action.payload;
      return state.filter((user) => user._id !== userIdToRemove);
    },
    removeFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, removeUserFromFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
