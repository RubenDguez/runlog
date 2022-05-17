import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { ReactElement } from "react";
import { NavLink, To } from "react-router-dom";
import { routes, userSetting } from "../../routes";
import { useAppSelector } from "../../store/hooks";

export const ApplicationDrawer = () => {
  const theme = useTheme();
  const [drawerWidth] = useAppSelector((state) => [state.app.drawerWidth]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        // flexShrink: 0,
        transition: "ease-in-out 0.25s",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "ease-in-out 0.25s",
        },
        [theme.breakpoints.up("xs")]: {
          zIndex: theme.zIndex.drawer - 100,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar variant="dense" />
      <Divider />
      <List>
        {routes.map(
          (m, i) =>
            m.text &&
            m.icon &&
            m.to && <MenuItem key={i} to={m.to} icon={m.icon} text={m.text} />
        )}
      </List>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}></Box>
        <Divider />
        <List>
          {userSetting.map(
            (m, i) =>
              m.text &&
              m.icon &&
              m.to && <MenuItem key={i} to={m.to} icon={m.icon} text={m.text} />
          )}
        </List>
      </Box>
    </Drawer>
  );
};

interface IMenuItem {
  text: String;
  to: To;
  icon: ReactElement;
}

const MenuItem = ({ text, to, icon }: IMenuItem) => {
  const theme = useTheme();
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <ListItemButton
          selected={isActive}
          sx={{ color: theme.palette.text.primary }}
        >
          <ListItemIcon sx={{ color: theme.palette.text.primary }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      )}
    </NavLink>
  );
};
