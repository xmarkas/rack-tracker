import { Box, Button, Grid2 } from "@mui/material";
import { useState } from "react";
import { ATNview } from "./ATNview";
import { PCIview } from "./PCIview";

export const BuildingView = () => {
  const [select, setSelect] = useState(true);

  const handleSelect = (s: boolean) => {
    if (select !== s) {
      setSelect(!select);
    }
  };

  return (
    <Box>
      <Grid2 container py={1} px={0.5}>
        <Grid2
          size={{ xs: 12 }}
          px={10}
          py={0}
          justifyContent="space-around"
          display="flex"
        >
          <Button
            variant={select ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleSelect(true)}
          >
            ATN
          </Button>
          <Button
            variant={!select ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleSelect(false)}
          >
            PCI
          </Button>
        </Grid2>
      </Grid2>

      {select && <ATNview />}
      {!select && <PCIview />}
    </Box>
  );
};
