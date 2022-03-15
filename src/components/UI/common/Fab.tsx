import { Box, useTheme } from "@mui/material";
import { ReactElement } from "react";

interface IFab {
  action: () => void;
  children: ReactElement;
}

export const Fab = ({ action, children }: IFab) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        bottom: 70,
        color: theme.palette.text.primary,
        cursor: "pointer",
        display: "flex",
        height: 50,
        justifyContent: "center",
        margin: 0,
        padding: 0,
        position: "fixed",
        right: 70,
        transition: "ease-in-out 0.25s",
        width: 50,
        "&:hover": {
          borderColor: theme.palette.secondary.dark,
          color: theme.palette.warning.light,
          height: 80,
          width: 80,
        },
      }}
      onClick={action}
    >
      {children}
    </Box>
  );
};
