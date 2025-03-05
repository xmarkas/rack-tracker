
import { useState } from "react";
import {
  BarcodeScanner,
  DetectedBarcode,
  ScanOptions,
  BarcodeFormat,
} from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

function BarcodeC({ onResult = () => {} }: any) {
  const [value, setValue] = useState("");
  const [format, setFormat] = useState("");
  const [styles, setStyles] = useState({top: 100, left: 100, height: 200, width: 100});

  const handleCapture = (barcode: DetectedBarcode[]) => {
    const code = barcode[0];
    setValue(code.rawValue);
    setFormat(code.format);


    onResult(code.rawValue);
    
    const bBox = {top: 100, left: 100, height: 200, width: 100};
    setStyles({ top: bBox.top, left: bBox.left, height: bBox.height, width: bBox.width})

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
          <div id="capture" style={{...styles, position: "absolute", border: "1px solid red"}}></div>
          <div>
            <div>{format}</div>
            <div>{value}</div>
          </div>
        
      </div>
    </>
  );
}

export default BarcodeC;
