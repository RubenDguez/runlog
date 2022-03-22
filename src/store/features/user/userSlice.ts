import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types";

const initialState: IUser = {
  atPickUp: true,
  secondLoadRate: 200,
  baseRate: 0.4,
  emptyRate: 0.2,
  minMiles: 60,
  userId: 1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
