import { Button as CButton, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

export interface IButton extends ButtonProps {
  children: ReactNode;
}

export const Button = ({ children, color = "success", ...rest }: IButton) => {
  return (
    <CButton {...rest} color={color} variant="outlined" fullWidth>
      {children}
    </CButton>
  );
};

export default Button;
