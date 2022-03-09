import { Button as CButton, ButtonProps } from "@mui/material";
import { ReactNode } from "react";
import { useAppSelector } from "../../../app/hooks";

export interface IButton extends ButtonProps {
  children: ReactNode;
}

export const Button = ({ children, color = "success", ...rest }: IButton) => {
  const theme = useAppSelector((state) => state.app.theme);
  return (
    <CButton
      {...rest}
      color={color}
      variant={theme === "dark" ? "outlined" : "contained"}
      fullWidth
    >
      {children}
    </CButton>
  );
};

export default Button;
