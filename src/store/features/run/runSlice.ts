import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRunState } from "../../../types";

export const initialState: IRunState = {
  loadNumber: 0,
  secondLoad: false,
  pickUpLocation: "",
  dropOffLocation: "",
  pickUpDate: "",
  dropOffDate: "",
  loadedMiles: 0,
  emptyMiles: 0,
  extras: 0,
};

const runSlice = createSlice({
  name: "run",
  initialState,
  reducers: {
    setRunState(state, action: PayloadAction<IRunState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setRunState } = runSlice.actions;
export default runSlice.reducer;
