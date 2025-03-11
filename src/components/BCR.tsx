import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
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

export const BRC = () => {
  const [result, setResult] = useState("");
  //   const { devices } = useMediaDevices({ constraints });
  //   const deviceId = devices?.[0]?.deviceId;

  const handleCapture = (result: any) => {
    setResult(result.text);
  };

  const { ref } = useZxing({
    
    onResult: (r: any) => handleCapture(r),
    constraints: constraints,
    
  });

  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia({ video: true }).then((p) => {
  //     setResult(`${p.active} `);
  //   });
  // }, []);

  return (
    <Grid2 container={true}>
      <Grid2 size={{xs:12}} style={{border: "1px solid red", height: "100%", width: "100%"}}>
      <video ref={ref}  style={{zIndex:1000}}/>
      <span>{result}</span>
      </Grid2>
      
    </Grid2>
  );
};
