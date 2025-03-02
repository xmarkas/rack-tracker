import { Button, Grid2 } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
import { useNavigate } from "react-router-dom";

export const ATNview = () => {
  const navigate = useNavigate();
const handleClick = (_e: React.MouseEvent, value: string) => {
    navigate(`/${value}/hall`);
}

  return (
    <Grid2
      container={true}
      size={{ xs: 12 }}
      columnSpacing={2}
      rowSpacing={2}
      mt={2}
      px={2}
    >
      {["ATN1", "ATN3", "ATN5", "ATN6", "ATN7"].map((v) => (
        <Grid2 key={v} size={{ xs: 4 }}>
          <Button
            defaultValue={v}
            endIcon={<ForwardIcon />}
            variant="contained"
            sx={{ width: "100%", color: "black", background: "#eeeeee" }}
            onClick={(e) => { handleClick(e, v)}}
          >
            {v}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};
