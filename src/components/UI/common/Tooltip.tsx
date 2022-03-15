import { styled } from "@mui/material/styles";
import { Tooltip as TTip, tooltipClasses, TooltipProps } from "@mui/material";

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <TTip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.text.secondary,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.text.secondary}`,
  },
}));
