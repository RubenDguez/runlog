import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EDialogResponse, EDialogType, IApp } from "../../../types";

export const initialState: IApp = {
  theme: "dark",
  expandAccordion: true,
  filterYear: null,
  filterWeek: null,
  drawerWidth: 50,
  drawerExpanded: false,
  dialog: {
    type: null,
    show: false,
    response: null,
    title: null,
    message: null,
  },
  snackbar: {
    open: false,
    message: "",
    variant: "success",
  },
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
    setDialogType(state, action: PayloadAction<EDialogType | null>) {
      state.dialog.type = action.payload;
    },
    setDialogShow(state, action: PayloadAction<boolean>) {
      state.dialog.show = action.payload;
    },
    setDialogResponse(state, action: PayloadAction<EDialogResponse | null>) {
      state.dialog.response = action.payload;
    },
    setDialogTitle(state, action: PayloadAction<string | null | undefined>) {
      state.dialog.title = action.payload;
    },
    setDialogMessage(state, action: PayloadAction<string | null>) {
      state.dialog.message = action.payload;
    },
    setDialogClear(state) {
      state.dialog.show = false;
      state.dialog.message = null;
      state.dialog.title = null;
      state.dialog.response = null;
      state.dialog.type = null;
    },
    toggleSnackbar(state) {
      state.snackbar.open = !state.snackbar.open;
    },
    setSnackbarMessage(state, action: PayloadAction<string>) {
      state.snackbar.message = action.payload;
    },
    setSnackbarVariant(
      state,
      action: PayloadAction<"error" | "info" | "success" | "warning">
    ) {
      state.snackbar.variant = action.payload;
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
  setDialogType,
  setDialogShow,
  setDialogResponse,
  setDialogTitle,
  setDialogMessage,
  setDialogClear,
  toggleSnackbar,
  setSnackbarMessage,
  setSnackbarVariant,
} = appSlice.actions;
export default appSlice.reducer;
