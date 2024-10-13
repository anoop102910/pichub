import { createSlice } from "@reduxjs/toolkit";
import { GState } from "@/types";

const gState = createSlice({
  name: "gState",
  initialState: {
    query: "",
  } as GState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = gState.actions;
export default gState.reducer;