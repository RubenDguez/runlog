import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box } from "@mui/system";

export interface ILoader {
  message?: string;
}

export const Loader = ({ message }: ILoader) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          padding: "16px 32px",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <LocalShippingIcon sx={{ color: "teal", fontSize: "5rem" }} />
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body1"
                sx={{ textAlign: "left", marginBottom: "8px" }}
              >
                {message || "Loading..."}
              </Typography>
              <LinearProgress
                sx={{
                  "& .MuiLinearProgress-barColorPrimary": {
                    backgroundColor: "teal",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
