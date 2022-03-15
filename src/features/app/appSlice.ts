import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApp } from "../../types";

export const initialState: IApp = {
  theme: "dark",
  expandAccordion: true,
  filterYear: null,
  filterWeek: null,
  drawerWidth: 50,
  drawerExpanded: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"dark" | "light">) {
      state.theme = action.payload;
    },
    toggleAccordion(state) {
      state.expandAccordion = !state.expandAccordion;
    },
    setExpandedAccordion(state, action: PayloadAction<boolean>) {
      state.expandAccordion = action.payload;
    },
    setFilterYear(state, action: PayloadAction<string | null>) {
      state.filterYear = action.payload;
    },
    setFilterWeek(state, action: PayloadAction<string | null>) {
      state.filterWeek = action.payload;
    },
    toggleDrawer(state) {
      state.drawerExpanded = !state.drawerExpanded;
      state.drawerWidth = state.drawerExpanded ? 200 : 50;
    },
  },
});

export const {
  setTheme,
  toggleAccordion,
  setExpandedAccordion,
  setFilterYear,
  setFilterWeek,
  toggleDrawer,
} = appSlice.actions;
export default appSlice.reducer;
