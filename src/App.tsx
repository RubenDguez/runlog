import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RunFilters, Runs } from "./components/tables/run";
import { New, Update } from "./components/forms/run";
import { Error } from "./components/UI/Error";
import { Authorized } from "./layouts/Authorized";

export const App = () => {
  return (
    <Box sx={{ margin: "1rem", padding: "1rem" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authorized />}>
            <Route path="" element={"HOME"} />
            <Route path="runfilters" element={<RunFilters />} />
            <Route path="runs" element={<Runs />} />
            <Route path="runform" element={<New />} />
            <Route path="runform/:id" element={<Update />} />
            <Route path="error" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
