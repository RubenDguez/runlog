import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dialog } from "./components/UI/common/Dialog";
import { Loader } from "./components/UI/Loader";
import { useGetAllQuery } from "./store/features/run/runDTOSlice";
import { Authorized } from "./layouts/Authorized";
import { routes, userSetting } from "./routes";
import { Snackbar } from "./components/UI/common/Snackbar";
import { Unauthorized } from "./layouts/Unauthorized";

export const App = () => {
  const { isLoading } = useGetAllQuery();

  if (isLoading) return <Loader />;

  // TODO: LOGIC TO VERIFY USER AUTHORIZATION

  return (
    <Box sx={{ margin: "1rem", padding: "1rem" }}>
      <Dialog />
      <Snackbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Unauthorized />}>
            {routes
              .filter((f) => f.authorization === false)
              .map((m, i) => (
                <Route key={i} path={m.path} element={m.element} />
              ))}
          </Route>
          <Route path="/authorized" element={<Authorized />}>
            {routes
              .filter((f) => f.authorization === true)
              .map((m, i) => (
                <Route key={i} path={m.path} element={m.element} />
              ))}
            {userSetting
              .filter((f) => f.authorization === true)
              .map((m, i) => (
                <Route key={i} path={m.path} element={m.element} />
              ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
