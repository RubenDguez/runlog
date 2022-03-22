import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table as TTable,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { IRunStateDTO } from "../../../types";
import { IStatData, TableSummary } from "./TableSummary";
import { TableHeader } from "./TableHeader";
import { TableRows } from "./TableRows";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "../../../store/hooks";

export interface IRunTable {
  title?: string;
  rows: IRunStateDTO[] | undefined;
}

export const Table = ({ title = "All Runs", rows }: IRunTable) => {
  const expandAccordion = useAppSelector((state) => state.app.expandAccordion);
  const [expanded, setExpanded] = useState(expandAccordion);

  const tootleExpanded = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  useEffect(() => {
    setExpanded(expandAccordion);
  }, [expandAccordion]);

  const rowsStats: IStatData = useMemo(() => {
    let totalLoadedMiles = 0;
    let totalEmptyMiles = 0;
    let totalLoadedCash = 0;
    let totalEmptyCash = 0;
    let totalExtras = 0;
    let totalTrip = 0;

    if (rows) {
      rows.forEach((fe) => {
        totalLoadedMiles += fe.loadedMiles;
        totalEmptyMiles += fe.emptyMiles;
        totalLoadedCash += fe.loadedCash;
        totalEmptyCash += fe.emptyCash;
        totalExtras += fe.extras;
        totalTrip += fe.totalTrip;
      });
    }

    return {
      totalLoadedMiles,
      totalEmptyMiles,
      totalLoadedCash,
      totalEmptyCash,
      totalExtras,
      totalTrip,
    };
  }, [rows]);

  return (
    <Accordion
      expanded={expanded}
      variant="outlined"
      TransitionProps={{ unmountOnExit: true }}
      sx={{ marginTop: "4px" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={tootleExpanded} />}
        id={`${title}-header`}
        aria-controls={`${title}-content`}
      >
        <Typography variant="subtitle2">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Box}>
          <TTable sx={{ minWidth: 750 }} size="small">
            <TableHead>
              <TableHeader />
            </TableHead>
            <TableBody sx={{ overflow: "hidden" }}>
              {rows && rows.map((row) => <TableRows key={row.id} data={row} />)}
              <TableSummary data={rowsStats} />
            </TableBody>
          </TTable>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
