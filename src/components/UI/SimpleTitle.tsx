import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import { ReactNode } from "react";

interface ISimpleTitle {
  children: ReactNode;
  variant?:
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2"
    | undefined;
  borderBottom?: boolean;
  sx?: SxProps<Theme> | undefined;
}

export const SimpleTitle = ({
  children,
  variant = "body1",
  borderBottom = false,
  sx,
}: ISimpleTitle) => {
  return (
    <Box sx={{ ...sx, marginBottom: borderBottom ? "1rem" : "" }}>
      <Typography
        variant={variant}
        sx={{
          fontWeight: "100",
          borderBottom: borderBottom ? "solid 1px" : "",
          paddingBottom: borderBottom ? "4px" : "",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};
