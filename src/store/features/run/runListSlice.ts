import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRunStateDTO } from "../../../types";

const initialState: IRunStateDTO[] = [];

const runListSlice = createSlice({
  name: "runList",
  initialState,
  reducers: {
    setRunStateList(state, action: PayloadAction<IRunStateDTO[]>) {
      action.payload.forEach((fe) => {
        state.push(fe);
      });
    },
    createRun(state, action: PayloadAction<IRunStateDTO>) {
      state.push(action.payload);
    },
    updateRun(state, action: PayloadAction<IRunStateDTO>) {
      state = state.filter((f) => f.id !== action.payload.id);
      state.push(action.payload);
      return state;
    },
    deleteRun(state, action: PayloadAction<number>) {
      return (state = state.filter((f) => f.id !== action.payload));
    },
  },
});

export const { setRunStateList, createRun, updateRun, deleteRun } =
  runListSlice.actions;
export default runListSlice.reducer;
