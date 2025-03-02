import { Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #cecece",
  boxShadow: 24,
  p: 4,
  borderRadius: 3
};

// interface MyProps {
//     [index: string]: string | number | boolean;
// }

export const RackModal = ({open = false, handleClose = () => {}, modalData} : any) => {


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalData.serialNumber}
        </Typography>
      </Box>
    </Modal>
  );
};
