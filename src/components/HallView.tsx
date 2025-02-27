import { Button, Grid2 } from "@mui/material";
import { useState } from "react";

export const HallView = () => {
  const [hall, setHall] = useState("A");

  const handleSelect = (val: string) => {
    setHall(val);
  };

  return (
    <Grid2 container py={1} px={0.5}>
      <Grid2 size={{ xs: 12 }}>
        <Button
          variant={hall === "A" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleSelect("A")}
        >
          A
        </Button>
        <Button
          variant={hall === "B" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleSelect("B")}
        >
          B
        </Button>
        <Button
          variant={hall === "C" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleSelect("C")}
        >
          C
        </Button>
        <Button
          variant={hall === "D" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleSelect("D")}
        >
          D
        </Button>
      </Grid2>
    </Grid2>
  );
};
