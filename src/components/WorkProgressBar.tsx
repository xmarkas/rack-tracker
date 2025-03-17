import { LinearProgress, Grid2, Box, Typography } from "@mui/material";
import { FC } from "react";
import { Row } from "tinybase";


interface ProgressProps {
  title: string;
  data: Row[] | Object[];
}

export const WorkProgressBar: FC<ProgressProps> = ({title, data = []}) => {
  console.log(data)
  const progress = () => {
    let totals : number = data.length;
    let completed: number = data.filter((r : any) => {return r.unset || r.slcSET}).length;
    console.log(completed)
    return completed === totals ? 100 : Math.floor(((completed) / totals) * 100);
  };

  return (
    <Grid2 container py={1} px={0.5}>
      <Grid2 size={{ xs: 12 }}>
        <Typography>{title}</Typography>
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
              {progress()}%
            </Typography>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};
