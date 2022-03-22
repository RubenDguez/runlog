import { configureStore } from "@reduxjs/toolkit";
import runSliceReducer from "./features/run/runSlice";
import appSliceReducer from "./features/app/appSlice";
import userSliceReducer from "./features/user/userSlice";
import runListSliceReducer from "./features/run/runListSlice";

import { runDTOApi } from "./features/run/runDTOSlice";
import { queryErrorLogger } from "./queryErrorLogger";

export const store = configureStore({
  reducer: {
    app: appSliceReducer,
    user: userSliceReducer,
    run: runSliceReducer,
    runList: runListSliceReducer,

    [runDTOApi.reducerPath]: runDTOApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      queryErrorLogger,
      runDTOApi.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
