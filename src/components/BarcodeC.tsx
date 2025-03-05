import { Button } from "@mui/material";
import { useState } from "react";
import {
  BarcodeScanner,
  DetectedBarcode,
  ScanOptions,
  BarcodeFormat,
} from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

function BarcodeC() {
  const [code, setCode] = useState<DetectedBarcode | null>(null);
  const [pause, setPause] = useState(false);

  const reScan = () => {
    setCode(null);
    setPause(false);
  };

  const handleCapture = (barcode: DetectedBarcode[]) => {
    setPause(true);
    const selectCode = barcode[0];

    if (!code) {
      setCode(selectCode);
    }
  };

  const constraintsConfig: MediaTrackConstraints = {
    facingMode: {
      ideal: "environment",
    },
  };
  const formats = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_39,
  ];

  const optionsConfig: ScanOptions = {
    formats: formats,
    delay: 500,
  };

  return (
    <div style={{position: "relative"}}>
      <div
        id="scannerbox"
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          background: "black",
        }}
      >
        <BarcodeScanner
          options={optionsConfig}
          trackConstraints={constraintsConfig}
          onCapture={handleCapture}
          paused={pause}
        />
        <div style={{ top: 0, left:0}}>
          <div
            style={{
              position: "absolute",
              borderRight: "1px solid red",
              top: 0,
              height: "100%",
              width: "50%",
              zIndex: 100,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              borderBottom: "1px solid red",
              top: 0,
              height: "50%",
              width: "100%",
              zIndex: 100,
            }}
          ></div>
        </div>
      </div>

      <div style={{position: "absolute", right: 10, bottom: 10, zIndex: 500}}>
        {pause && (
          <Button variant="contained" color="warning" onClick={reScan}>
            Re-Scan
          </Button>
        )}
      </div>
    </div>
  );
}

export default BarcodeC;
