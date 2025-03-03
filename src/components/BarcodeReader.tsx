import { Box } from "@mui/material";
import BarcodeScannerComponent from "react-qr-barcode-scanner";


export const BarcodeReader = ({closeReader} : any) => {

  const constraints: MediaTrackConstraints = {
    facingMode: "environment",
    frameRate: 500,
  }

  
  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, zIndex: 500, height: "100vh"}}>
      <BarcodeScannerComponent
        videoConstraints={constraints}
        delay={500}
        width="auto"
        height="100%"
        facingMode="environment"
        onUpdate={(err, result:any) => {
          if (result) {
            closeReader(result);
          } else if (err) {
            console.log("bad", err)
          }

        }}
      />
    </Box>
  );
};
