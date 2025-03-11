import { useEffect, useState } from "react";
// import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";

const constraints: MediaStreamConstraints = {
  video: true,
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
    paused: false,
    onResult: (r) => handleCapture(r),
    constraints: constraints,
    
  });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((p) => {
      setResult(`${p.active} `);
    });
  }, []);

  return (
    <div>
      <video ref={ref} height={"100px"} width={"300px"}/>
      <span>{result}</span>
    </div>
  );
};
