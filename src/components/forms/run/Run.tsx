import { Grid } from "@mui/material";
import { useCallback } from "react";
import {
  useCreateMutation,
  useUpdateMutation,
} from "../../../store/features/run/runDTOSlice";
import { SwitchSX, Button, TextField } from "../../UI/common";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  initialState,
  setRunState,
} from "../../../store/features/run/runSlice";
import { useRunFormValidation } from "../../../hooks/useRunFormValidation";
import { useMessage } from "../../../hooks/useMessage";
export interface IRun {
  id?: number;
  isUpdate?: boolean;
}

export const Run = ({ id = 0, isUpdate = false }: IRun) => {
  const [state, currUser, runList] = useAppSelector((state) => [
    state.run,
    state.user,
    state.runList,
  ]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addRun] = useCreateMutation();
  const [update] = useUpdateMutation();
  const message = useMessage();

  const { isDropOffValid, isFormValid, isLoadNumberValid } =
    useRunFormValidation(runList, state, isUpdate);

  const handleClear = useCallback(() => {
    dispatch(setRunState({ ...initialState }));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSave = useCallback(async () => {
    const preparedData = { ...state, ...currUser };
    try {
      await addRun(preparedData).unwrap();
      handleClear();
      message("Run was saved successfully", "success");
      dispatch(setRunState(initialState));
    } catch (err) {
      message(`${err}`, "error");
    }
  }, [state, currUser, handleClear, addRun, message, dispatch]);

  const handleUpdate = useCallback(async () => {
    const preparedData: IRun = { ...state, ...currUser, id } as IRun;
    try {
      await update({ id, ...preparedData });
      message("Run was updated successfully", "success");
      navigate(-1);
    } catch (err) {
      message(`${err}`, "error");
    }
  }, [id, state, currUser, update, message, navigate]);

  type TKey = keyof typeof initialState;
  const handleChange = useCallback(
    (key: TKey, change: string | number | boolean) => {
      if (change !== null) {
        dispatch(
          setRunState({
            ...state,
            [key]: change,
          })
        );

        if (key === "secondLoad") {
          dispatch(
            setRunState({
              ...state,
              secondLoad: !state.secondLoad,
              emptyMiles: 0,
            })
          );
        }

        if ((key === "pickUpDate" || key === "dropOffDate") && change !== "") {
          dispatch(
            setRunState({
              ...state,
              [key]: new Date(`${change}T00:00:00.000Z`).toISOString(),
            })
          );
        }
      }
    },
    [state, dispatch]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          label="Load number"
          type="number"
          value={state.loadNumber}
          onChange={(e) => handleChange("loadNumber", Number(e.target.value))}
          error={!isLoadNumberValid}
          helperText={!isLoadNumberValid ? "Load number already exists" : ""}
          disabled={isUpdate || false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SwitchSX
          label="Second Load"
          size="small"
          value={state.secondLoad}
          checked={state.secondLoad}
          onChange={(e) => handleChange("secondLoad", Boolean(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Pickup location"
          type="text"
          value={state.pickUpLocation}
          onChange={(e) =>
            handleChange("pickUpLocation", String(e.target.value))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Drop off location"
          type="text"
          value={state.dropOffLocation}
          onChange={(e) =>
            handleChange("dropOffLocation", String(e.target.value))
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Pickup date"
          type="date"
          value={state.pickUpDate.toString().substring(0, 10)}
          onChange={(e) => handleChange("pickUpDate", String(e.target.value))}
          error={!isDropOffValid}
          helperText={
            !isDropOffValid ? "Pickup date is greater than drop off date" : ""
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Drop off date"
          type="date"
          value={state.dropOffDate.toString().substring(0, 10)}
          onChange={(e) => handleChange("dropOffDate", String(e.target.value))}
          error={!isDropOffValid}
          helperText={
            !isDropOffValid ? "Drop off date is less than pickup date" : ""
          }
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label="Loaded miles"
          type="number"
          value={state.loadedMiles}
          onChange={(e) => handleChange("loadedMiles", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label="Empty miles"
          type="number"
          value={state.emptyMiles}
          disabled={state.secondLoad}
          onChange={(e) => handleChange("emptyMiles", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label="Extras"
          type="text"
          value={state.extras}
          InputProps={{ inputProps: { max: 5, min: -1 } }}
          onChange={(e) => handleChange("extras", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {!isUpdate && (
            <Grid item xs={12} md={isUpdate ? 6 : 4}>
              <Button color="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Grid>
          )}
          <Grid item xs={12} md={isUpdate ? 6 : 4}>
            <Button color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
          {isUpdate && (
            <Grid item xs={12} md={isUpdate ? 6 : 4}>
              <Button
                color="warning"
                onClick={handleUpdate}
                disabled={!isFormValid}
              >
                Update
              </Button>
            </Grid>
          )}
          {!isUpdate && (
            <Grid item xs={12} md={isUpdate ? 6 : 4}>
              <Button
                color="primary"
                onClick={handleSave}
                disabled={!isFormValid}
              >
                Save
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
