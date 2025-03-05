import { Modal, Box, Typography, Grid2, Button } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "background.paper",
  border: "1px solid #cecece",
  boxShadow: 24,
  p: 3,
  borderRadius: 3,
};

export const RackModal = ({
  open = false,
  handleClose = () => {},
  modalData,
  barcode,
}: any) => {
  const [data, setData] = useState(modalData);

  useEffect(() => {
    setData(modalData);
  }, []);

  const handleButtonClick = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ background: "#000000a6" }}
    >
      <Box sx={style}>
        <Grid2 container size={{ xs: 12 }}>
          <Grid2 size={{ xs: 5 }}>
            <Typography>Location</Typography>
            <Typography>{data.location}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <Typography>Move Type</Typography>
            <Typography>{data.moveType}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 3 }}>
            <Typography>Serial #</Typography>
            <Typography>{data.serialNumber || barcode}</Typography>
          </Grid2>
        </Grid2>
        <Grid2
          container
          size={{ xs: 12 }}
          mt={3}
          display="flex"
          justifyContent="space-around"
        >
          <Grid2 size={{ xs: 4 }}>
            <Button
              variant="contained"
              size="medium"
              sx={{ background: "#ffeb3b", color: "black", width: "100%" }}
              onClick={handleButtonClick}
            >
              Create Issue
            </Button>
          </Grid2>
          {/* <Grid2 size={{ xs: 3 }} >
            <Button variant="contained" size="medium" color="inherit">
              Audit Complete
            </Button>
          </Grid2> */}
          <Grid2 size={{ xs: 4 }}>
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "100%" }}
              onClick={handleButtonClick}
            >
              Mark Complete
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
};
