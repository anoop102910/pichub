import { createSlice } from "@reduxjs/toolkit";
const gState = createSlice({
    name: "gState",
    initialState: {
        query: "",
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    },
});
export const { setQuery } = gState.actions;
export default gState.reducer;
