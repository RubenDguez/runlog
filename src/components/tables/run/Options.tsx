import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import {
  toggleAccordion,
  toggleDescendingOrder,
} from "../../../store/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Switch } from "../../UI/common";

export const Options = () => {
  const [expandAccordion, descOrder] = useAppSelector((state) => [
    state.app.expandAccordion,
    state.app.descendingOrder,
  ]);
  const dispatch = useAppDispatch();

  const handleTootleSorting = useCallback(() => {
    dispatch(toggleDescendingOrder());
  }, [dispatch]);

  const handleToggleExpandAccordion = useCallback(() => {
    dispatch(toggleAccordion());
  }, [dispatch]);

  return (
    <Paper
      elevation={1}
      sx={{
        padding: "0.25rem 1rem",
        marginBottom: "8px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption">COLLAPSED</Typography>
            <Switch
              size="small"
              checked={expandAccordion}
              onClick={handleToggleExpandAccordion}
            />
            <Typography variant="caption">EXPANDED</Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption">ASC</Typography>
            <Switch
              size="small"
              checked={descOrder}
              onClick={handleTootleSorting}
            />
            <Typography variant="caption">DESC</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
