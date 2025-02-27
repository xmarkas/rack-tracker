import { Button, Grid2 } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";

export const PCIview = () => {
  return (
    <Grid2
      container={true}
      size={{ xs: 12 }}
      columnSpacing={2}
      rowSpacing={2}
      mt={2}
      px={2}
    >
      {["PCI2", "PCI5"].map((v) => (
        <Grid2 size={{ xs: 4 }}>
          <Button
            endIcon={<ForwardIcon />}
            variant="contained"
            sx={{ width: "100%", color: "black", background: "#dedede" }}
          >
            {v}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};
