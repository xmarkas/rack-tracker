import {
  Button,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import Decoms from "../store/Decoms.model";
import { useTablesListener } from "tinybase/ui-react";
import { WorkProgressBar } from "./WorkProgressBar";

export const HallView = ({ openModal = (_data = {}) => {} }) => {
  const [hall, setHall] = useState("A");
  const building_ID: string = useParams().building_ID || "";
  const [hallData, setHallData] = useState<Object[]>([]);
  const [hallCounts, setHallCounts] = useState({ A: 0, B: 0, C: 0, D: 0 });
  useTablesListener(() => {
    //Get hall data
    const data = [
      ...Moves.byBuilding(building_ID),
      ...Slcs.byBuilding(building_ID),
      ...Decoms.byBuilding(building_ID),
    ];

    setHallData(data);
    // Get hall counts
    setHallCounts(getCounts(data));
  });

  const getCounts = (arr: Object[]) => {
    return {
      A: arr.filter((h: any) => h.hall === "A").length,
      B: arr.filter((h: any) => h.hall === "B").length,
      C: arr.filter((h: any) => h.hall === "C").length,
      D: arr.filter((h: any) => h.hall === "D").length,
    };
  };

  useEffect(() => {
    //Get hall data
    const data = [
      ...Moves.byBuilding(building_ID),
      ...Slcs.byBuilding(building_ID),
      ...Decoms.byBuilding(building_ID),
    ];

    setHallData(data);
    // Get hall counts
    setHallCounts(getCounts(data));
  }, []);

  const handleSelect = (val: string) => {
    setHall(val);
  };

  const selectRow = (rowData: { [key: string]: any }) => {
    const getData = hallData.find(
      (obj: any) => obj.serialNumber === rowData.serialNumber
    );
    console.log(getData);
    openModal(getData);
  };

  const createRows = (e: { [key: string]: any }): {} => {
    let action = e.action;
    let audit = false;
    let rowColor = "initial"

    if (e.action === "SLC") {
      if (e.inPosition) {
        action = "slc";
      } else {
        action = "transit";
      }
    }

    if ((e.slcSET || e.unset) && !e.auditComplete) {
      audit = true;
    }

    if (e.hasPriority ) {
      rowColor = "#ffeb3b"
    } else if (e.hasIssue) {
      rowColor = "#f44336"
    } else if (e.slcSET || e.unset) {
      rowColor = "lightgray"
    }

    return {
      row: e.row,
      side: e.side,
      position: e.position,
      action: action,
      serialNumber: e.serialNumber,
      set: e.slcSET || e.unset || false,
      needsAudit: audit,
      auditComplete: e.auditComplete,
      hasPriority: e.hasPriority,
      hasIssue: e.hasIssue,
      rowColor: rowColor
    };
  };

  const listData = (): Object[] => {
    let list =
      hallData.filter((i: any) => i.hall === hall).map((r) => createRows(r)) ||
      [];
    
    return list.sort((a: any, b : any) => {
      
      if (a.auditComplete && b.auditComplete) {
        return +a.row < +b.row ? -1 : 1
      }  
      if (+a.row < +b.row) {
        return a.auditComplete ? 1 : -1;
      }
      if (+a.row > +b.row) {
        return b.auditComplete ? -1 : 1; 
      }
      if (b.auditComplete) {
        return -1;
      }
      return 0;
    })

    
  };

  return (
    <Grid2 size={{ xs: 12 }} container px={0.5}>
      <Grid2
        size={{ xs: 12 }}
        sx={{
          position: "sticky",
          top: "58px",
          background: "white",
          zIndex: 100,
          borderBottom: "1px solid lightgray",
        }}
        py={2}
      >
        <Grid2
          size={{ xs: 12 }}
          textAlign="center"
        >
          <WorkProgressBar />
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          textAlign="center"
          fontWeight={700}
          fontSize={25}
        >
          {building_ID}
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          display="flex"
          justifyContent="center"
          columnGap={2}
          mt={1}
        >
          <Badge badgeContent={hallCounts.A} color="error">
            <Button
              variant={hall === "A" ? "contained" : "outlined"}
              color="success"
              onClick={() => handleSelect("A")}
            >
              A
            </Button>
          </Badge>
          <Badge badgeContent={hallCounts.B} color="error">
            <Button
              variant={hall === "B" ? "contained" : "outlined"}
              color="success"
              onClick={() => handleSelect("B")}
            >
              B
            </Button>
          </Badge>
          <Badge badgeContent={hallCounts.C} color="error">
            <Button
              variant={hall === "C" ? "contained" : "outlined"}
              color="success"
              onClick={() => handleSelect("C")}
            >
              C
            </Button>
          </Badge>

          <Badge badgeContent={hallCounts.D} color="error">
            <Button
              variant={hall === "D" ? "contained" : "outlined"}
              color="success"
              onClick={() => handleSelect("D")}
            >
              D
            </Button>
          </Badge>
        </Grid2>
      </Grid2>

      {/*       LIST TABLE        */}
      <Grid2 size={{ xs: 12 }} sx={{ overflow: "hidden" }} mt={2}>
        <TableContainer component={Paper} >
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: "large" }}>
                  Row.Position
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, fontSize: "large" }}
                  align="center"
                >
                  Action
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, fontSize: "large" }}
                  align="right"
                >
                  Serial Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData().map((row: any) => (
                <TableRow
                  key={row.serialNumber}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: row.rowColor,
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "large" }}
                  >
                    {row.row + row.side + "." + row.position}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "large" }}>
                    <Badge color="error" badgeContent="audit" invisible={!row.needsAudit}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          width: "100px",
                          background:
                            row.action === "transit" || row.auditComplete ? "lightgray" : "#1976d2",
                        }}
                        onClick={() => selectRow(row)}
                      >
                        {row.action}
                      </Button>
                    </Badge>
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "large" }}>
                    {row.serialNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </Grid2>
  );
};
