import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { DRAWER_WIDTH } from "./ApplicationBar";
import { Link } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import HomeIcon from "@mui/icons-material/Home";

export const ApplicationDrawer = () => {
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ boxShadow: theme.shadows[1] }} />
      <Divider />
      <List>
        <Link to="">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              sx={{ color: theme.palette.text.primary }}
            />
          </ListItem>
        </Link>
        <Link to="runs">
          <ListItem button>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Run List"
              sx={{ color: theme.palette.text.primary }}
            />
          </ListItem>
        </Link>
        <Link to="runfilters">
          <ListItem button>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Run List with Filters"
              sx={{ color: theme.palette.text.primary }}
            />
          </ListItem>
        </Link>
        <Link to="runform">
          <ListItem button>
            <ListItemIcon>
              <AddCircleIcon color="disabled" />
            </ListItemIcon>
            <ListItemText
              primary="Add Run"
              sx={{ color: theme.palette.text.primary }}
            />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};
