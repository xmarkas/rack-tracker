import { Box, Button, Grid2, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { sheetsLink } from "../tools/sheetsLink";

export const CSVinput = () => {
  const [csvlink, setCsvLink] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCsvLink(e.target.value);
  };

const handleDownload = () => {
    console.log('-->', sheetsLink());
}

  return (
    <Box>
      <Grid2 container size={{ xs: 12 }} px={10} pt={30}>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            variant="outlined"
            label="CSV Link"
            defaultValue={csvlink}
            onChange={handleInput}
            fullWidth={true}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }} textAlign="right" mt={2}>
          <Button variant="contained" onClick={handleDownload}>Add Link</Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};
