import { Container, Grid, Modal, Typography, useTheme } from "@mui/material";
import { ReactNode, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setDialogResponse,
  setDialogShow,
} from "../../../store/features/app/appSlice";
import { EDialogResponse, EDialogType } from "../../../types";
import Button from "./Button";

export const Dialog = () => {
  const dialog = useAppSelector((state) => state.app.dialog);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleClose = useCallback(() => {
    dispatch(setDialogResponse(null));
    dispatch(setDialogShow(false));
  }, [dispatch]);

  const handleResponse = useCallback(() => {
    switch (dialog.type) {
      case EDialogType.YES_NO:
        dispatch(setDialogResponse(EDialogResponse.YES));
        break;

      default:
        break;
    }
  }, [dialog.type, dispatch]);

  const actionTypes: ReactNode = useMemo(() => {
    switch (dialog.type) {
      case EDialogType.YES_NO:
        return (
          <>
            <Grid item xs={12} md={6}>
              <Button color="error" onClick={() => handleClose()}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button color="warning" onClick={() => handleResponse()}>
                Yes
              </Button>
            </Grid>
          </>
        );

      default:
        break;
    }
  }, [dialog.type, handleResponse, handleClose]);

  return (
    <Modal
      open={dialog.show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        animation: "fadein 0.75s",
        "@keyframes fadein": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          border: `2px solid ${theme.palette.secondary.main}`,
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Container>
          <Typography
            sx={{
              textTransform: "uppercase",
              borderBottom: "1px solid",
              marginBottom: "1rem",
            }}
          >
            {dialog.title}
          </Typography>
          <Typography sx={{ marginBottom: "3rem" }}>
            {dialog.message}
          </Typography>
          <Grid container spacing={2}>
            {actionTypes}
          </Grid>
        </Container>
      </Container>
    </Modal>
  );
};
