import { ReactElement } from "react";
import { To } from "react-router-dom";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import HomeIcon from "@mui/icons-material/Home";
import { Chart } from "../components/UI/Chart";
import { RunFilters } from "../components/tables/run";
import { New, Update } from "../components/forms/run";
import { Error } from "../components/UI/Error";

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
    text: "Home",
    icon: <HomeIcon />,
    to: "/authorized/",
    authorization: true,
    path: "",
    element: <Chart />,
  },
  {
    text: "Runs",
    icon: <FormatListNumberedIcon />,
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
