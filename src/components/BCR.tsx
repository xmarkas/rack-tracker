import { Grid2 } from "@mui/material";
import {  useState } from "react";
// import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";

const constraints: MediaStreamConstraints = {
  video: {
    facingMode: "environment",
    height: 500,
    width: 500
  },
  audio: false,
  
};

export const BCR = () => {
  const [result, setResult] = useState("");
  //   const { devices } = useMediaDevices({ constraints });
  //   const deviceId = devices?.[0]?.deviceId;

  const handleCapture = (result: any) => {
    setResult(result.getText());
  };

  const { ref } = useZxing({
    paused: false,
    onResult: (r: any) => handleCapture(r),
    constraints: constraints,
    
  });



  return (
    <Grid2 container>
      <Grid2 size={{xs:12}} style={{border: "1px solid red", height: "100%", width: "100%"}}>
      <video ref={ref}  />
      <span>{result}</span>
      </Grid2>
      
    </Grid2>
  );
};
