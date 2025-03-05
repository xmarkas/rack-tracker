import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BarcodeScanner,
  DetectedBarcode,
  ScanOptions,
  BarcodeFormat,
} from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

function BarcodeC() {
  const [barcode, setBarcode] = useState<DetectedBarcode | null>(null);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
    }
  }, [barcode]);

  const reScan = () => {
    setBarcode(null);
    setPause(false);
  }

  const handleCapture = (barcode: DetectedBarcode[]) => {
    setPause(true);
    const code = barcode[0];

    if (!barcode) {
      setBarcode(code);
    }
  };

  const constraintsConfig: MediaTrackConstraints = {
    facingMode: {
      ideal: "environment",
    }
  };
  const formats = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_39,
  ];

  const optionsConfig: ScanOptions = {
    formats: formats,
    delay: 500
  };

  return (
    <div>
      <BarcodeScanner
        options={optionsConfig}
        trackConstraints={constraintsConfig}
        onCapture={handleCapture}
        paused={pause}
        
      />
      <div
        style={{
          position: "absolute",
          borderRight: "1px solid red",
          top: 0,
          height: "100%",
          width: "50%",
          zIndex:100
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          borderBottom: "1px solid red",
          top: 0,
          height: "50%",
          width: "100%",
          zIndex:100
        }}
      ></div>
      <div style={{ position: "absolute", bottom: 5, right: 5 }}>
        {pause && <Button variant="contained" color="warning" onClick={reScan}>Re-Scan</Button>}

      </div>
    </div>
  );
}

export default BarcodeC;
