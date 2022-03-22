import { useCallback } from "react";
import { useAppDispatch } from "../store/hooks";
import {
  setDialogMessage,
  setDialogShow,
  setDialogTitle,
  setDialogType,
} from "../store/features/app/appSlice";
import { EDialogType } from "../types";

export const useDialog = () => {
  const dispatch = useAppDispatch();

  const show = useCallback(
    (type: EDialogType, title: string | null | undefined, message: string) => {
      dispatch(setDialogType(type));
      dispatch(setDialogTitle(title));
      dispatch(setDialogMessage(message));
      dispatch(setDialogShow(true));
    },
    [dispatch]
  );

  return show;
};
