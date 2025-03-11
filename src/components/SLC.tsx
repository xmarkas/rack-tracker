import { Grid2, Box, Badge, Button } from "@mui/material";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import Decoms from "../store/Decoms.model";
import { useResultRowIds } from "tinybase/ui-react";
import { WorkProgressBar } from "./WorkProgressBar";
import { BuildingNav } from "./BuildingNav";
import { useNavigate } from "react-router-dom";


export const SLC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  }

  const getPriorities = () => {
    const priorityTotals: number =
      useResultRowIds("priorityMoves", Moves.priorityCount).length +
      useResultRowIds("prioritySlcs", Slcs.priorityCount).length +
      useResultRowIds("priorityDecoms", Decoms.priorityCount).length;
    return priorityTotals;
  };

  const getIssues = () => {
    const issueTotals: number =
      useResultRowIds("issueMoves", Moves.issueCount).length +
      useResultRowIds("issueSlcs", Slcs.issueCount).length +
      useResultRowIds("issueDecoms", Decoms.issueCount).length;
    return issueTotals;
  };

  const getAuditCount = () => {
    let total: number =
      useResultRowIds("auditDecoms", Decoms.auditCount).length +
      useResultRowIds("auditSlcs", Slcs.auditCount).length +
      useResultRowIds("auditMoves", Moves.auditCount).length;
    return total;
  };

  return (
    <Box>
      <WorkProgressBar />
      {/* ROW 1 */}
      <Grid2 container py={1} px={0.5}>
        {/* Unsets */}
        <Grid2 size={{ xs: 4 }} px={2} py={1} display="grid">
          <Badge
            badgeContent={
              useResultRowIds("unsetCount", Moves.unSetCount).length
            }
            color={
              useResultRowIds("unsetCount", Moves.unSetCount).length === 0
                ? "success"
                : "error"
            }
            showZero={true}
          >
            <Button
              variant="outlined"
              sx={{
                p: 2,
                border: "lightgray 1px solid",
                minWidth: "100%",
                color: "black",
              }}
              onClick={() => handleNavigate('Moves/viewlist')}
            >
              Unset
            </Button>
          </Badge>
        </Grid2>
        {/* SLC */}
        <Grid2 size={{ xs: 4 }} p={1} px={2} display="grid">
          <Badge
            badgeContent={useResultRowIds("slcCount", Slcs.slcCount).length}
            color={
              useResultRowIds("slcCount", Slcs.slcCount).length === 0
                ? "success"
                : "error"
            }
            showZero={true}
          >
            <Button
              variant="outlined"
              sx={{
                p: 2,
                border: "lightgray 1px solid",
                minWidth: "100%",
                color: "black",
              }}
              onClick={() => handleNavigate('Slcs/viewlist')}
            >
              SLC
            </Button>
          </Badge>
        </Grid2>
        {/* Decoms */}
        <Grid2 size={{ xs: 4 }} p={1} px={2} display="grid">
          <Badge
            badgeContent={
              useResultRowIds("decomCount", Decoms.decomCount).length
            }
            color={
              useResultRowIds("decomCount", Decoms.decomCount).length === 0
                ? "success"
                : "error"
            }
            showZero={true}
          >
            <Button
              variant="outlined"
              sx={{
                p: 2,
                border: "lightgray 1px solid",
                minWidth: "100%",
                color: "black",
              }}
              onClick={() => handleNavigate('Decoms/viewlist')}
            >
              Decom
            </Button>
          </Badge>
        </Grid2>
      </Grid2>

      {/* ROW 2 */}
      <Grid2 container py={1} px={0.5}>
        {/* L2+ AUDIT */}
        <Grid2 size={{ xs: 4 }} px={2} py={1} display="grid">
          <Badge
            badgeContent={getAuditCount()}
            color={getAuditCount() === 0 ? "success" : "error"}
            showZero={true}
          >
            <Button
              variant="outlined"
              sx={{
                p: 1,
                border: "lightgray 1px solid",
                minWidth: "100%",
                color: "black",
              }}
            >
              L2+ Audit
            </Button>
          </Badge>
        </Grid2>
        {/* HI PRIORITY */}
        <Grid2 size={{ xs: 4 }} p={1} px={2} display="grid">
          <Badge badgeContent={getPriorities()} color="error">
            <Button
              disabled={getPriorities() === 0 ? true : false}
              disableElevation={true}
              variant={getPriorities() === 0 ? "outlined" : "contained"}
              sx={{
                p: 0,
                border: "lightgray 1px solid",
                minWidth: "100%",
                color: "black",
                backgroundColor: getPriorities() === 0 ? "" : "#ffeb3b",
              }}
            >
              High Priority
            </Button>
          </Badge>
        </Grid2>
        {/* ISSUES */}
        <Grid2 size={{ xs: 4 }} p={1} px={2} display="grid">
          <Badge badgeContent={getIssues()} color="error">
            <Button
              disabled={getIssues() === 0 ? true : false}
              disableElevation={true}
              variant={getIssues() === 0 ? "outlined" : "contained"}
              sx={{
                p: 2,
                border: "lightgray 1px solid",
                minWidth: "100%",
                backgroundColor: getIssues() === 0 ? "" : "#d32f2f",
                color: "white",
              }}
            >
              ISSUES
            </Button>
          </Badge>
        </Grid2>
      </Grid2>
      <hr style={{ borderTop: "1px solid #ccc", width: "90%" }} />
      <BuildingNav />
    </Box>
  );
};
