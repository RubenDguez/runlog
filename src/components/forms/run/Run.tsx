import { Grid } from "@mui/material";
import { useCallback, useMemo } from "react";
import {
  useCreateMutation,
  useGetAllQuery,
} from "../../../features/run/runDTOSlice";
import { Switch, Button, TextField } from "../../UI/common";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { initialState, setRunState } from "../../../features/run/runSlice";

export interface IRun {
  isUpdate?: boolean;
}

export const Run = ({ isUpdate = false }: IRun) => {
  const [state, currUser] = useAppSelector((state) => [state.run, state.user]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addRun] = useCreateMutation();
  const { refetch } = useGetAllQuery();

  const isDropOffValid = useMemo(() => {
    let startingDate = new Date(state.pickUpDate.toString().substring(0, 10));
    let endingDate = new Date(state.dropOffDate.toString().substring(0, 10));

    return endingDate.getTime() < startingDate.getTime();
  }, [state.pickUpDate, state.dropOffDate]);

  const isFormValid = useMemo(() => {
    const { secondLoad, extras, emptyMiles, ...rest } = state; // * omiting fields which will not be tested
    let valid: boolean[] = [];

    Object.values(rest).forEach((fe) => {
      return valid.push(!!fe);
    });

    return !valid.some((s) => s === false) && !isDropOffValid;
  }, [state, isDropOffValid]);

  const handleClear = useCallback(() => {
    dispatch(setRunState({ ...initialState }));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSave = useCallback(async () => {
    const preparedData = { ...state, ...currUser };
    try {
      await addRun(preparedData).unwrap();
      refetch();
      handleClear();
    } catch (err) {
      console.error(err);
    }
  }, [state, currUser, refetch, handleClear, addRun]);

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

        if (key === "pickUpDate" || key === "dropOffDate") {
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
      <Grid item xs={12} lg={6}>
        <TextField
          label="Load number"
          type="number"
          value={state.loadNumber}
          onChange={(e) => handleChange("loadNumber", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Switch
          label="Second Load"
          size="small"
          value={state.secondLoad}
          checked={state.secondLoad}
          onChange={(e) => handleChange("secondLoad", Boolean(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="Pickup location"
          type="text"
          value={state.pickUpLocation}
          onChange={(e) =>
            handleChange("pickUpLocation", String(e.target.value))
          }
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="Dropoff location"
          type="text"
          value={state.dropOffLocation}
          onChange={(e) =>
            handleChange("dropOffLocation", String(e.target.value))
          }
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="Pickup date"
          type="date"
          value={state.pickUpDate.toString().substring(0, 10)}
          onChange={(e) => handleChange("pickUpDate", String(e.target.value))}
          error={isDropOffValid}
          helperText={
            isDropOffValid ? "Pickup date is greater than dropoff date" : ""
          }
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="Dropoff date"
          type="date"
          value={state.dropOffDate.toString().substring(0, 10)}
          onChange={(e) => handleChange("dropOffDate", String(e.target.value))}
          error={isDropOffValid}
          helperText={
            isDropOffValid ? "Dropoff date is less than pickup date" : ""
          }
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          label="Loaded miles"
          type="number"
          value={state.loadedMiles}
          onChange={(e) => handleChange("loadedMiles", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          label="Empty miles"
          type="number"
          value={state.emptyMiles}
          disabled={state.secondLoad}
          onChange={(e) => handleChange("emptyMiles", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
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
            <Grid item xs={12} lg={isUpdate ? 6 : 4}>
              <Button color="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Grid>
          )}
          <Grid item xs={12} lg={isUpdate ? 6 : 4}>
            <Button color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} lg={isUpdate ? 6 : 4}>
            <Button
              color="primary"
              onClick={handleSave}
              disabled={!isFormValid}
            >
              {isUpdate ? "Update" : "Save"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
