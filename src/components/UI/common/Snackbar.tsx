import { Alert, AlertTitle, Snackbar as SBR, useTheme } from "@mui/material";
import { useCallback } from "react";
import { toggleSnackbar } from "../../../store/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const Snackbar = () => {
  const snack = useAppSelector((state) => state.app.snackbar);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleClose = useCallback(() => {
    dispatch(toggleSnackbar());
  }, [dispatch]);

  return (
    <SBR open={snack.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={() => handleClose()}
        severity={snack.variant}
        variant="outlined"
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <AlertTitle sx={{ textTransform: "uppercase" }}>
          {snack.variant}
        </AlertTitle>
        {snack.message}
      </Alert>
    </SBR>
  );
};
