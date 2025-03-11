import { Button, Grid2, Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import Decoms from "../store/Decoms.model";
import { useTablesListener } from "tinybase/ui-react";
import { WorkProgressBar } from "./WorkProgressBar";
import { RackList } from "./RackList";

export const HallView = () => {
  const [hall, setHall] = useState<string>("A");
  const building_ID: string = useParams().building_ID || "";
  const [hallCounts, setHallCounts] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [hallData, setHallData] = useState<Object[]>([]);

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
        <Grid2 size={{ xs: 12 }} textAlign="center">
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
      <RackList data={hallData} filterConditions={{ hall: hall }} />
    </Grid2>
  );
};
