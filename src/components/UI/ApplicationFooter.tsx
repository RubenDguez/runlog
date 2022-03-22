import { AppBar, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

export const ApplicationFooter = () => {
  const currentYear = new Date().getFullYear();
  const drawerWidth = useAppSelector((state) => state.app.drawerWidth);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        top: "auto",
        bottom: 0,
        transition: "ease-in-out 0.25s",
      }}
    >
      <Toolbar variant="dense">
        <Typography
          variant="caption"
          component={"div"}
          sx={{ flexGrow: 1, textAlign: "right" }}
        >
          {`RubenSys all rights reserved. 2021 - ${currentYear}`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
