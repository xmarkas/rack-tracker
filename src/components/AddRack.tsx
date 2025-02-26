import { useState, useEffect } from "react";
import { UnsetMove } from "../store/models";
import { Grid2 } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Teams,
  Action,
  MoveType,
  Building,
  Hall,
  HallSide,
} from "../store/types";

export const AddRack = () => {
  const [val, setVal] = useState("");

  const getKeys = (E: any): string[] => {
    return Object.keys(E).filter((key) => isNaN(Number(key)));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setVal(event.target.value as string);
  };

  //   useEffect(() => {
  //     getKeys(Teams);
  //   }, [])

  return (
    <Grid2 className="add-rack">
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth={true}>
          <InputLabel id="demo-simple-select-label">Team</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={val}
            label="Team"
            onChange={handleChange}
          >
            {getKeys(Teams).map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Grid2>
  );
};
