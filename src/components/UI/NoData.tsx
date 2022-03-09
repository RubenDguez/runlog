import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import StorageIcon from "@mui/icons-material/Storage";

export const NoData = () => {
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
        <StorageIcon sx={{ fontSize: "10rem", color: "tomato" }} />
        <Typography variant="h3">Upss!! No data available</Typography>
      </Box>
    </Container>
  );
};
