import {
  Grid2,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Badge,
  Button,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTablesListener } from "tinybase/ui-react";
import Decoms from "../store/Decoms.model";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import { useParams } from "react-router";

interface Conditions {
    [index : string] : string | boolean
  }
// const filterConditions: Conditions = { hall: "A"}

export const RackList: FC<Conditions> = ({filterConditions}) => {
  const [hallData, setHallData] = useState<Object[]>([]);
  const building_ID: string = useParams().building_ID || "";

  useTablesListener(() => {
    //Get hall data
    const data = [
      ...Moves.byBuilding(building_ID),
      ...Slcs.byBuilding(building_ID),
      ...Decoms.byBuilding(building_ID),
    ];
    setHallData(data);
  });

  useEffect(() => {
    //Get hall data
    const data = [
      ...Moves.byBuilding(building_ID),
      ...Slcs.byBuilding(building_ID),
      ...Decoms.byBuilding(building_ID),
    ];

    setHallData(data);
  }, []);

  const createRows = (e: { [key: string]: any }): {} => {
    let action = e.action;
    let audit = false;
    let rowColor = "initial";

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

    if (e.hasPriority) {
      rowColor = "#ffeb3b";
    } else if (e.hasIssue) {
      rowColor = "#f44336";
    } else if (e.slcSET || e.unset) {
      rowColor = "lightgray";
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
      rowColor: rowColor,
    };
  };

  const listData = (): Object[] => {
    let filterlist = hallData.filter((i: any) => {
        return Object.keys(filterConditions).every((key:string) =>
            i[key] === filterConditions[key]
        )
    })
      
     let list = filterlist.map((r) => createRows(r));

    return list.sort((a: any, b: any) => {
      if (a.auditComplete && b.auditComplete) {
        return +a.row < +b.row ? -1 : 1;
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
    });
  };

  return (
    <Grid2 size={{ xs: 12 }} sx={{ overflow: "hidden" }} mt={2}>
      <TableContainer component={Paper}>
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
                  <Badge
                    color="error"
                    badgeContent="audit"
                    invisible={!row.needsAudit}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        width: "100px",
                        background:
                          row.action === "transit" || row.auditComplete
                            ? "lightgray"
                            : "#1976d2",
                      }}
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
  );
};
