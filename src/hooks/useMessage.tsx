import { useCallback } from "react";
import {
  setSnackbarMessage,
  setSnackbarVariant,
  toggleSnackbar,
} from "../store/features/app/appSlice";
import { useAppDispatch } from "../store/hooks";

export const useMessage = () => {
  const dispatch = useAppDispatch();

  const message = useCallback(
    (message: string, variant: "error" | "info" | "success" | "warning") => {
      dispatch(setSnackbarMessage(message));
      dispatch(setSnackbarVariant(variant));
      dispatch(toggleSnackbar());
    },
    [dispatch]
  );

  return message;
};
