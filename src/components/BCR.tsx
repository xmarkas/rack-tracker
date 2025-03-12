import { Grid2 } from "@mui/material";
import { useState } from "react";
// import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";

const constraints: MediaStreamConstraints = {
  video: {
    facingMode: "environment",
    height: 500,
    width: 500,
  },
  audio: false,
  
};

export const BCR = () => {
  const [result, setResult] = useState("");
  //   const { devices } = useMediaDevices({ constraints });
  //   const deviceId = devices?.[0]?.deviceId;

  const handleCapture = (result: any) => {
    alert("capture")
    setResult(result.getText());
  };

  const { ref } = useZxing({
    paused: false,
    onResult: (r: any) => handleCapture(r),
    constraints: constraints,
    timeBetweenDecodingAttempts: 300
  });

  return (
    <Grid2 container sx={{ background: "black", height: "75vh" }}>
      <Grid2
        size={{ xs: 12 }}
        position={"absolute"}
        display={"flex"}
        width={"100vw"}
        height={"75vh"}
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
        top={0}
        left={0}
      >
        <div
          style={{
            background: "lightblue",
            position: "absolute",
            left: "calc(50vw - 100px)",
            top: "calc(37vh - 100px)"
          }}
        >
          <div
            style={{
              position: "absolute",
              borderRight: "1px solid red",
              height: "200px",
              width: "100px",
              zIndex: 100,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              borderBottom: "1px solid red",
              height: "100px",
              width: "200px",
              zIndex: 100,
            }}
          ></div>
        </div>
        <video ref={ref} style={{ backgroundSize: "contain" }} />
      </Grid2>
      <Grid2
        size={{ xs: 12 }}
        textAlign={"center"}
        sx={{ background: "black", color: "red", fontWeight: "700" }}
        display={"flex"}
        flex={1}
      >
        {result} 
      </Grid2>
    </Grid2>
  );
};
