import { AppBar, Toolbar, Typography } from "@mui/material";

export const DRAWER_WIDTH = 245;

export const ApplicationFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="inherit"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        top: "auto",
        bottom: 0,
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
