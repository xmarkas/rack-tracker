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
  const [_pause, setPause] = useState(false);
  const [styles, setStyles] = useState({
    top: 100,
    left: 100,
    height: 200,
    width: 100,
  });

  const handleCapture = (barcode: DetectedBarcode[]) => {
    setPause(true);
    const code = barcode[0];
    setValue(code.rawValue);
    setFormat(code.format);

    const bBox = code.boundingBox;
    setStyles({
      top: bBox.top,
      left: bBox.left,
      height: bBox.height,
      width: bBox.width,
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
          paused={true}
        />
        <div
          style={{
            position: "absolute",
            borderRight: "1px solid red",
            top: 0,
            height: "100%",
            width: "50%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            borderBottom: "1px solid red",
            top: 0,
            height: "50%",
            width: "100%",
          }}
        ></div>
        <div style={{position: "absolute", top: 0}}>
          <div>{format}</div>
          <div>{value}</div>
          <div>top : {styles.top}  | height : {styles.height}  | left : {styles.left}  | width : {styles.width}</div>
        </div>
      </div>
    </>
  );
}

export default BarcodeC;
