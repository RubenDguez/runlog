import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ErrorIcon from "@mui/icons-material/Error";

export const Error = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <ErrorIcon sx={{ fontSize: "10rem", color: "tomato" }} />
        <Typography variant="h3">Upss!! something went wrong...</Typography>
      </Box>
    </Container>
  );
};
