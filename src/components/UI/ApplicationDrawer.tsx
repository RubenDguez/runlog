import { NavLink, To } from "react-router-dom";

import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { routes } from "../../routes";

import { ReactElement } from "react";
import { useAppSelector } from "../../app/hooks";

export const ApplicationDrawer = () => {
  const theme = useTheme();
  const drawerWidth = useAppSelector((state) => state.app.drawerWidth);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: "ease-in-out 0.25s",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "ease-in-out 0.25s",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{ boxShadow: theme.shadows[1], transition: "ease-in-out 0.25s" }}
      />
      <Divider />
      <List>
        {routes.map(
          (m, i) =>
            m.text &&
            m.icon &&
            m.to && <MenuItem key={i} to={m.to} icon={m.icon} text={m.text} />
        )}
      </List>
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
