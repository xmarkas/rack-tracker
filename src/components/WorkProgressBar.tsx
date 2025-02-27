import { LinearProgress, Grid2, Box, Typography } from "@mui/material";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import Decoms from "../store/Decoms.model";
import { useResultRowIds } from "tinybase/ui-react";

const progress = () => {
  let totals: number = Moves.count() + Slcs.count() + Decoms.count();
  let completed: number =
    useResultRowIds("unsetCount", Moves.unSetCount).length +
    useResultRowIds("slcCount", Slcs.slcCount).length +
    useResultRowIds("decomCount", Decoms.decomCount).length;
  return Math.floor(((totals - completed) / totals) * 100);
};

export const WorkProgressBar = () => {
  const progress = () => {
    let totals: number = Moves.count() + Slcs.count() + Decoms.count();
    let completed: number =
      useResultRowIds("unsetCount", Moves.unSetCount).length +
      useResultRowIds("slcCount", Slcs.slcCount).length +
      useResultRowIds("decomCount", Decoms.decomCount).length;
    return Math.floor(((totals - completed) / totals) * 100);
  };

  return (
    <Grid2 container py={1} px={0.5}>
      <Grid2 size={{ xs: 12 }}>
        <Typography>Task Progress</Typography>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "80%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress()}
              color="success"
              sx={{ background: "lightgray", height: 10, borderRadius: 3 }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {progress() || 100}%
            </Typography>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};
