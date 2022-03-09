import { CssBaseline, ThemeProvider as TP } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { darkTheme, lightTheme } from "./theme";

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const theme = useAppSelector((state) => state.app.theme);
  const [actualTheme, setActualTheme] = useState(darkTheme);

  useEffect(() => {
    if (theme === "dark") setActualTheme(darkTheme);
    else setActualTheme(lightTheme);
  }, [theme]);

  return (
    <TP theme={actualTheme}>
      <CssBaseline />
      {children}
    </TP>
  );
};
