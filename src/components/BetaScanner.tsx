import { useState } from "react";
import { BarcodeScanner } from "./BarcodeReaderAlt"

export const BetaScanner = () => {
    const [result, setResult] = useState({});

    const handleResult = (data: {}) : void => {
        setResult(data);
        console.log(data)
    }

    const handleError = (err : {}) => {
        console.log(err);
    }

    return (
        <div>
            <BarcodeScanner onResult={(r) => handleResult()} onError={handleError}/>
            <div>{result.toString()}</div>
        </div>
    )
}