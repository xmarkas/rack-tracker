import { Box } from "@mui/material";
import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";


export const BarcodeReader = () => {
  const [data, setData] = useState("Not Found");

  const constraints: MediaTrackConstraints = {
    facingMode: "environment"
  }

  
  
  return (
    <Box id="LLOOKK" >
      <BarcodeScannerComponent
        videoConstraints={constraints}
        width={500}
        height={500}
        facingMode="environment"
        onUpdate={(err, result:any) => {
          if (result) {
            setData(result.text)
            console.log("good",result)
          } else if (err) {
            console.log("bad", err)
          }

        }}
      />
      <p>{data}</p>
    </Box>
  );
};
