import { AppBar, IconButton, Switch, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setTheme } from "../../features/app/appSlice";
import { useCallback } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const DRAWER_WIDTH = 245;

export const ApplicationBar = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.app.theme);

  const handleThemeChange = useCallback(() => {
    if (mode === "dark") dispatch(setTheme("light"));
    else dispatch(setTheme("dark"));
  }, [dispatch, mode]);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="inherit"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Runlog
        </Typography>
        <DarkModeIcon fontSize="small" />
        <Switch
          size="small"
          checked={mode === "dark" ? false : true}
          value={mode === "dark" ? "dark" : "light"}
          onChange={handleThemeChange}
        />
        <LightModeIcon
          fontSize="small"
          color={mode === "light" ? "inherit" : "warning"}
        />
      </Toolbar>
    </AppBar>
  );
};
