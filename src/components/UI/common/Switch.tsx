import { Switch as CSwitch, SwitchProps } from "@mui/material";

export interface ISwitch extends SwitchProps {}

export const Switch = ({ ...rest }: ISwitch) => {
  return (
    <CSwitch
      {...rest}
      sx={{
        ".MuiSwitch-track": {
          borderRadius: "0px",
        },
        ".MuiSwitch-thumb": {
          borderRadius: "0px",
        },
      }}
    />
  );
};
