import { Fab, Grid2,} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { DecodeHintType, Result, useZxing } from "react-zxing";
import { BarcodeFormat, BrowserMultiFormatReader } from "@zxing/library";
import { FlashlightOff, FlashlightOn } from "@mui/icons-material";


const constraints: MediaStreamConstraints = {
  video: {
    facingMode: "environment",
  },
  audio: false,
};

const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

interface OutputObj {
  vRef: React.RefObject<HTMLVideoElement>;
  barcode: string;
  torchOn?: () => Promise<void>;
  torchOff?: () => Promise<void>;
}

const BCRoutput: FC<OutputObj> = ({ vRef, barcode }) => {
  const [result, setResult] = useState("");

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = 300;
    return instance;
  }, []);

  useEffect(() => {
    setResult(barcode);
  }, [barcode]);

  useEffect(() => {
    if (!vRef.current) return;
    reader.decodeFromConstraints(constraints, vRef.current, (result, error) => {
      if (result) console.log(result.getText());
      if (error) console.log(error);
    });
    return () => {
      reader.reset();
      
    };
  }, [vRef, reader]);

  return (
    <Grid2
      size={{ xs: 12 }}
      textAlign={"center"}
      sx={{ background: "black", color: "red", fontWeight: "700" }}
      position={"absolute"}
      left={0}
      top={200}
    >
      {result}
    </Grid2>
  );
};

export const BCR = () => {
  const [result, setResult] = useState("");
  const [toggle, setToggle] = useState(false);

  const { ref, torch } = useZxing({
    paused: false,
    onResult: (r: Result) => setResult(r.getText()),
    constraints: {...constraints},
    timeBetweenDecodingAttempts: 300,
    hints: hints,
  });

  const handleTorch = () => {
    navigator.vibrate([900, 900, 500, 900])
    if (toggle) {
      torch.off().then(() => {
        setToggle(false);
      })    
    } else {
      torch.on().then(() => {
        setToggle(true);
      })
    }
   
    
    
  }

  return (
    <Grid2 container sx={{ background: "black", height: "75vh" }}>
      <Grid2
        size={{ xs: 12 }}
        position={"absolute"}
        display={"flex"}
        width={"100vw"}
        height={"75vh"}
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
        top={0}
        left={0}
      >
        <div
          style={{
            background: "lightblue",
            position: "absolute",
            left: "calc(50vw - 100px)",
            top: "calc(37vh - 100px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              borderRight: "1px solid red",
              height: "200px",
              width: "100px",
              zIndex: 100,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              borderBottom: "1px solid red",
              height: "100px",
              width: "200px",
              zIndex: 100,
            }}
          ></div>
        </div>
        <video ref={ref} style={{ backgroundSize: "contain" }} />
        <Fab
          sx={{
            position: "absolute",
            right: 25,
            bottom: 25,
            background: "#f5f5f573",
            border: "1px solid yellow"
          }}
          onClick={handleTorch}
        >
          {toggle ? <FlashlightOff />  : <FlashlightOn />}
        </Fab>
      </Grid2>
      <BCRoutput vRef={ref} barcode={result} />
    </Grid2>
  );
};
