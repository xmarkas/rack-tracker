import { useState } from "react";
import {
  BarcodeScanner,
  DetectedBarcode,
  ScanOptions,
  BarcodeFormat,
} from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

function BarcodeC() {
  const [value, setValue] = useState("");
  const [format, setFormat] = useState("");
  const [styles, setStyles] = useState({
    top: 100,
    left: 100,
    height: 200,
    width: 100,
  });

  const handleCapture = (barcode: DetectedBarcode[]) => {
    const code = barcode[0];
    setValue(code.rawValue);
    setFormat(code.format);

    const bBox = code.boundingBox;
    setStyles({
      top: bBox?.top | 10,
      left: bBox?.left | 10,
      height: bBox?.height | 10,
      width: bBox?.width | 10,
    });
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
    delay: 500,
    formats: formats,
  };

  return (
    <>
      <div>
        <BarcodeScanner
          options={optionsConfig}
          trackConstraints={constraintsConfig}
          onCapture={handleCapture}
        />
        <div
          id="capture"
          style={{ ...styles, position: "absolute", border: "1px solid red" }}
        ></div>
        <div>
          <div>{format}</div>
          <div>{value}</div>
        </div>
      </div>
    </>
  );
}

export default BarcodeC;
