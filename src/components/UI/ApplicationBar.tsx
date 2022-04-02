import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useCallback } from "react";
import { setTheme } from "../../store/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Switch } from "../UI/common/";

export const ApplicationBar = () => {
  const dispatch = useAppDispatch();
  const [mode, drawerWidth] = useAppSelector((state) => [
    state.app.theme,
    state.app.drawerWidth,
  ]);

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
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        transition: "ease-in-out 0.25s",
      }}
      variant="outlined"
    >
      <Toolbar variant="dense">
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
