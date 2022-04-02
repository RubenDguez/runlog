import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { ReactElement } from "react";
import { To } from "react-router-dom";
import { New, Update } from "../components/forms/run";
import { RunFilters } from "../components/tables/run";
import { Chart } from "../components/UI/Chart";
import { Error } from "../components/UI/Error";
import { Loader } from "../components/UI/Loader";
import { Unauthorized } from "../layouts/Unauthorized";

export interface IRoute {
  text?: string;
  to?: To;
  icon?: ReactElement;
  authorization: boolean;
  path: string;
  element: ReactElement;
}

export const routes: IRoute[] = [
  {
    authorization: false,
    path: "",
    element: <Unauthorized />,
  },
  {
    text: "Insight",
    icon: <InsightsIcon />,
    to: "/authorized/",
    authorization: true,
    path: "",
    element: <Chart />,
  },
  {
    text: "Runs",
    icon: <BackupTableSharpIcon />,
    to: "/authorized/runs",
    authorization: true,
    path: "runs",
    element: <RunFilters />,
  },
  {
    authorization: true,
    path: "/authorized/run-form",
    element: <New />,
  },
  {
    authorization: true,
    path: "/authorized/run-form/:id",
    element: <Update />,
  },
  {
    authorization: true,
    path: "error",
    element: <Error />,
  },
];

export const userSetting: IRoute[] = [
  {
    text: "User",
    icon: <PersonIcon />,
    to: "/authorized/user",
    authorization: true,
    path: "user",
    element: (
      <Loader message="We are working on User information, come back later..." />
    ),
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    to: "/authorized/user-settings",
    authorization: true,
    path: "user-settings",
    element: (
      <Loader message="We are working on User Settings, come back later..." />
    ),
  },
];
