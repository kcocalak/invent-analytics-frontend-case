import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchType } from "../routes/HomePage/types";

export const initialState: SearchType = {
  s: "Pokemon",
  i: "",
  type: null,
  page: 1,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieSearch(state, { payload }: PayloadAction<any>) {
      state.s = payload.s;
      state.i = payload.i;
      state.y = payload.y;
      state.type = payload.type;
      state.page = payload.page;
    },
  },
});

export const { setMovieSearch } = movieSlice.actions;

export default movieSlice.reducer;
