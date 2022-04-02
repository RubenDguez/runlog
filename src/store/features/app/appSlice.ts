import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EDialogResponse, EDialogType, IApp } from "../../../types";

export const initialState: IApp = {
  theme: "dark",
  expandAccordion: true,
  descendingOrder: true,
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
      return state;
    },
    toggleAccordion(state) {
      state.expandAccordion = !state.expandAccordion;
      return state;
    },
    setExpandedAccordion(state, action: PayloadAction<boolean>) {
      state.expandAccordion = action.payload;
      return state;
    },
    toggleDescendingOrder(state) {
      state.descendingOrder = !state.descendingOrder;
      return state;
    },
    setFilterYear(state, action: PayloadAction<string | null>) {
      state.filterYear = action.payload;
      return state;
    },
    setFilterWeek(state, action: PayloadAction<string | null>) {
      state.filterWeek = action.payload;
      return state;
    },
    toggleDrawer(state) {
      state.drawerExpanded = !state.drawerExpanded;
      state.drawerWidth = state.drawerExpanded ? 200 : 50;
      return state;
    },
    setDialogType(state, action: PayloadAction<EDialogType | null>) {
      state.dialog.type = action.payload;
      return state;
    },
    setDialogShow(state, action: PayloadAction<boolean>) {
      state.dialog.show = action.payload;
      return state;
    },
    setDialogResponse(state, action: PayloadAction<EDialogResponse | null>) {
      state.dialog.response = action.payload;
      return state;
    },
    setDialogTitle(state, action: PayloadAction<string | null | undefined>) {
      state.dialog.title = action.payload;
      return state;
    },
    setDialogMessage(state, action: PayloadAction<string | null>) {
      state.dialog.message = action.payload;
      return state;
    },
    setDialogClear(state) {
      state.dialog.show = false;
      state.dialog.message = null;
      state.dialog.title = null;
      state.dialog.response = null;
      state.dialog.type = null;
      return state;
    },
    toggleSnackbar(state) {
      state.snackbar.open = !state.snackbar.open;
      return state;
    },
    setSnackbarMessage(state, action: PayloadAction<string>) {
      state.snackbar.message = action.payload;
      return state;
    },
    setSnackbarVariant(
      state,
      action: PayloadAction<"error" | "info" | "success" | "warning">
    ) {
      state.snackbar.variant = action.payload;
      return state;
    },
  },
});

export const {
  setTheme,
  toggleAccordion,
  setExpandedAccordion,
  toggleDescendingOrder,
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
