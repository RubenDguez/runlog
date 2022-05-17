import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback } from "react";
import { setTheme, toggleDrawer } from "../../store/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Switch } from "../UI/common/";

export const ApplicationBar = () => {
  const drawerExpanded = useAppSelector((state) => state.app.drawerExpanded);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [mode] = useAppSelector((state) => [state.app.theme]);

  const handleToggleDrawerExpanded = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  const handleThemeChange = useCallback(() => {
    if (mode === "dark") dispatch(setTheme("light"));
    else dispatch(setTheme("dark"));
  }, [dispatch, mode]);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        transition: "ease-in-out 0.25s",
        zIndex: theme.zIndex.appBar + 100,
        [theme.breakpoints.up("xs")]: {
          width: "100%",
        },
      }}
      variant="outlined"
    >
      <Toolbar variant="dense">
        <IconButton
          sx={{ "&.MuiIconButton-root": { borderRadius: "0px" }, mr: 5 }}
          onClick={handleToggleDrawerExpanded}
        >
          {!drawerExpanded ? <MenuIcon /> : <CloseIcon />}
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
