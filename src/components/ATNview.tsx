import { Badge, Button, Grid2 } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
import { useNavigate } from "react-router-dom";
import Move from '../store/Moves.model'
import SLC from '../store/Slcs.model'
import Decom from '../store/Decoms.model'

export const ATNview = () => {
  const navigate = useNavigate();


const handleClick = (_e: React.MouseEvent, value: string) => {
    navigate(`/${value}/hall`);
}

const getCountByBuilding = (b: string) => {
  return Move.byBuilding(b).length + SLC.byBuilding(b).length + Decom.byBuilding(b).length;
}

const getBuildings = () => {
  return [...new Set([...Move.buildings(),...SLC.buildings(), ...Decom.buildings()])]
}

console.log(getBuildings())

  return (
    <Grid2
      container={true}
      size={{ xs: 12 }}
      columnSpacing={2}
      rowSpacing={2}
      mt={2}
      px={2}
    >
      {getBuildings().map((v, index) => (
        <Grid2 key={index} size={{ xs: 4 }}>
          <Badge
            badgeContent={getCountByBuilding(v)}
            color={
              getCountByBuilding(v) === 0
                ? "success"
                : "error"
            }
            showZero={true}
          >
          <Button
            defaultValue={v}
            endIcon={<ForwardIcon />}
            variant="contained"
            sx={{ width: "100%", color: "black", background: "#eeeeee" }}
            onClick={(e) => { handleClick(e, v)}}
          >
            {v}
          </Button></Badge>
        </Grid2>
      ))}
    </Grid2>
  );
};
