import {
  Stack,
  Switch as CSwitch,
  SwitchProps,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export interface ISwitch extends SwitchProps {
  label: string;
  position?: "left" | "center" | "right" | "expanded";
}

export const Switch = ({ label, position = "expanded", ...rest }: ISwitch) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          display: "flex",
          width: position === "expanded" ? "100%" : "inherit",
          alignItems: "center",
          marginLeft: position === "right" ? "auto" : "",
          marginRight: position === "left" ? "auto" : "",
          margin: position === "center" ? "0px auto 0px auto" : "",
        }}
      >
        <Typography
          sx={{
            flexGrow: position === "expanded" ? 1 : 0,
          }}
        >
          {label}
        </Typography>
        <CSwitch {...rest} />
      </Box>
    </Stack>
  );
};

export default Switch;
