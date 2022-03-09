import { TextField as CTextField, StandardTextFieldProps } from "@mui/material";

export interface ITextField extends StandardTextFieldProps {
  label: string;
}

export const TextField = ({ label, ...rest }: ITextField) => {
  return (
    <CTextField
      {...rest}
      label={label}
      fullWidth
      size="small"
      onFocus={(e) => e.target.select()}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default TextField;
