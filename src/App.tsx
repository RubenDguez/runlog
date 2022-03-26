import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dialog } from "./components/UI/common/Dialog";
import { Loader } from "./components/UI/Loader";
import { useGetAllQuery } from "./store/features/run/runDTOSlice";
import { Authorized } from "./layouts/Authorized";
import { routes } from "./routes";
import { Snackbar } from "./components/UI/common/Snackbar";

export const App = () => {
  const { isLoading } = useGetAllQuery();

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ margin: "1rem", padding: "1rem" }}>
      <Dialog />
      <Snackbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authorized />}>
            {routes.map((m, i) => (
              <Route key={i} path={m.path} element={m.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
