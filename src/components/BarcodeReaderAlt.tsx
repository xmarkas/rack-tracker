import {
  BrowserMultiFormatReader,
  DecodeHintType,
  Result,
  BarcodeFormat,
} from "@zxing/library";
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ZxingOptions {
  hints?: Map<DecodeHintType, any>;
  constraints?: MediaStreamConstraints;
  timeBetweenDecodingAttempts?: number;
  onResult?: (result: Result) => void;
  onError?: (error: Error) => void;
}

const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: "environment",
    },
  },
  hints = new Map().set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
  ]),
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
}: ZxingOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null);

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) {
        onResult(result);
        console.log("alt", result);
        alert(result.getText());
      }
      if (error) onError(error);
    });
    return () => {
      reader.reset();
    };
  }, [ref, reader]);

  return { ref };
};

export const BarcodeScanner = ({
  onResult = (_result: Result) => {},
  onError = (_err: any) => {},
  barcode = "",
}) => {
  const { ref } = useZxing({ onResult, onError });
  const navigate = useNavigate();

  const navBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (barcode !== "") navBack();
  }, [barcode]);

  return <video ref={ref} />;
};
