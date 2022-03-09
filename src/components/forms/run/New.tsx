import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { initialState, setRunState } from "../../../features/run/runSlice";
import { Run } from "./Run";

export const New = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRunState(initialState));
  }, [dispatch]);

  return <Run />;
};
