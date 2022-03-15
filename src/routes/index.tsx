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
  path: string;
  element: ReactElement;
}

export const routes: IRoute[] = [
  {
    text: "Home",
    icon: <HomeIcon />,
    to: "/",
    path: "",
    element: <Chart />,
  },
  {
    text: "Runs",
    icon: <FormatListNumberedIcon />,
    to: "/runs",
    path: "runs",
    element: <RunFilters />,
  },
  {
    path: "run-form",
    element: <New />,
  },
  {
    path: "run-form/:id",
    element: <Update />,
  },
  {
    path: "error",
    element: <Error />,
  },
];
