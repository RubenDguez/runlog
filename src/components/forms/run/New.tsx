import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import {
  initialState,
  setRunState,
} from "../../../store/features/run/runSlice";
import { Run } from "./Run";

export const New = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRunState(initialState));
  }, [dispatch]);

  return <Run />;
};
