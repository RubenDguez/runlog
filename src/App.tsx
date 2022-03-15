import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./layouts/Authorized";

import { routes } from "./routes";

export const App = () => {
  return (
    <Box sx={{ margin: "1rem", padding: "1rem" }}>
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
