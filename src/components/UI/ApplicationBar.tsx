import { AppBar, IconButton, Switch, Toolbar, Typography } from "@mui/material";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setTheme, toggleDrawer } from "../../features/app/appSlice";
import { useCallback } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const ApplicationBar = () => {
  const dispatch = useAppDispatch();
  const [mode, drawerWidth, drawerExpanded] = useAppSelector((state) => [
    state.app.theme,
    state.app.drawerWidth,
    state.app.drawerExpanded,
  ]);

  const handleThemeChange = useCallback(() => {
    if (mode === "dark") dispatch(setTheme("light"));
    else dispatch(setTheme("dark"));
  }, [dispatch, mode]);

  const handleToggleDrawerExpanded = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        transition: "ease-in-out 0.25s",
      }}
    >
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleToggleDrawerExpanded}
        >
          {!drawerExpanded ? (
            <ArrowRightIcon fontSize="large" />
          ) : (
            <ArrowLeftIcon fontSize="large" />
          )}
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
