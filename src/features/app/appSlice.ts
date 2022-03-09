import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApp } from "../../types";

export const initialState: IApp = {
  theme: "dark",
  expandAccordion: false,
  filterYear: null,
  filterWeek: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"dark" | "light">) {
      state.theme = action.payload;
    },
    toogleAccordion(state) {
      state.expandAccordion = !state.expandAccordion;
    },
    setExpandedAcordrion(state, action: PayloadAction<boolean>) {
      state.expandAccordion = action.payload;
    },
    setFilterYear(state, action: PayloadAction<string | null>) {
      state.filterYear = action.payload;
    },
    setFilterWeek(state, action: PayloadAction<string | null>) {
      state.filterWeek = action.payload;
    },
  },
});

export const {
  setTheme,
  toogleAccordion,
  setExpandedAcordrion,
  setFilterYear,
  setFilterWeek,
} = appSlice.actions;
export default appSlice.reducer;
