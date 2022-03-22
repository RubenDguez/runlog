import { useMemo } from "react";
import { IRunState, IRunStateDTO } from "../types";

export const useRunFormValidation = (
  runList: IRunStateDTO[],
  state: IRunState,
  isUpdate: boolean
) => {
  const isLoadNumberValid = useMemo(() => {
    if (isUpdate) return true;
    const load = runList.findIndex((f) => f.loadNumber === state.loadNumber);
    return load < 0;
  }, [runList, state.loadNumber, isUpdate]);

  const isDropOffValid = useMemo(() => {
    let startingDate = new Date(state.pickUpDate.toString().substring(0, 10));
    let endingDate = new Date(state.dropOffDate.toString().substring(0, 10));

    if (
      startingDate.toString() === "Invalid Date" ||
      endingDate.toString() === "Invalid Date"
    )
      return true;

    return endingDate.getTime() >= startingDate.getTime();
  }, [state.pickUpDate, state.dropOffDate]);

  const isFormValid = useMemo(() => {
    const { secondLoad, extras, emptyMiles, ...rest } = state; // * omitting fields which will not be tested
    let valid: boolean[] = [];

    Object.values(rest).forEach((fe) => {
      return valid.push(!!fe);
    });

    return (
      !valid.some((s) => s === false) && isDropOffValid && isLoadNumberValid
    );
  }, [state, isDropOffValid, isLoadNumberValid]);

  return { isFormValid, isLoadNumberValid, isDropOffValid };
};
