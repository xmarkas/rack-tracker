import { useState } from "react";
import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";

const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
};

export const BRC = () => {
    const [result, setResult] = useState("");
  const { devices } = useMediaDevices({ constraints });
  const deviceId = devices?.[0]?.deviceId;

const handleCapture = (result: any) => {
    setResult(result.text);
}


  const { ref } = useZxing({
    paused: false,
    deviceId,
    onResult: (r) => handleCapture(r)
  });

  return (
    <div>
      <video ref={ref} />
      <span>{result}</span>
    </div>
  );
};
