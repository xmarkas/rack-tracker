import { useState } from 'react'
import { BarcodeScanner, DetectedBarcode, ScanOptions, BarcodeFormat} from 'react-barcode-scanner'
import "react-barcode-scanner/polyfill"

function BarcodeC({onResult = () => {}}:any) { 
      const [result, setResult] = useState<string | undefined>("");

  const handleCapture = (barcode: DetectedBarcode[]) => {
      setResult(barcode.entries().next().value?.[1].rawValue)
      onResult(barcode.values().next().value);
  }



  const constraintsConfig: MediaTrackConstraints = {
    facingMode: {
      ideal: 'environment'
    },
    
  }
  const formats = [BarcodeFormat.CODE_128, BarcodeFormat.QR_CODE, BarcodeFormat.CODE_39]
  const optionsConfig: ScanOptions = {
    delay: 500,
    formats: formats,
  }

  return (
    <>
      <div>
        <BarcodeScanner options={optionsConfig} trackConstraints={constraintsConfig} onCapture={handleCapture} />
        <div>{result}</div>
       </div>
    </>
  )
}

export default BarcodeC