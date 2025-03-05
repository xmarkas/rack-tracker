import { BarcodeScanner, DetectedBarcode, ScanOptions} from 'react-barcode-scanner'
import "react-barcode-scanner/polyfill"

function BarcodeC({onResult = () => {}}:any) { 
  

  const handleCapture = (barcode: DetectedBarcode[]) => {
      console.log(barcode.toString())
      onResult(barcode.toString());
  }

  

  const constraintsConfig: MediaTrackConstraints = {
    width: { min: 640, ideal: 1280 },
    height: { min: 480, ideal: 720 },
    facingMode: {
      ideal: 'environment'
    },
    advanced: [
      { width: 1920, height: 1280 },
      { aspectRatio: 1.333 }
    ],
    
  }

  const optionsConfig: ScanOptions = {
    delay: 500,
    formats: ['qr_code', "code_39", "code_128", "codabar","ean_13","ean_8","upc_a", "upc_e"],
  
  }

  return (
    <>
      <div>
        <BarcodeScanner options={optionsConfig} trackConstraints={constraintsConfig} onCapture={handleCapture}/>
       </div>
    </>
  )
}

export default BarcodeC