import { Fab, Grid2 } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { Result, useZxing } from "react-zxing";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
import { FlashlightOff, FlashlightOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const constraints: MediaStreamConstraints = {
  video: {
    facingMode: "environment",
  },
  audio: false,
};

const hints = new Map();
const formats = [BarcodeFormat.CODE_128];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
hints.set(DecodeHintType.TRY_HARDER, true);

interface OutputObj {
  vRef: React.RefObject<HTMLVideoElement>;
  barcode?: string;
  torch: {
    on: () => Promise<void>;
    off: () => Promise<void>;
    isAvailable: boolean | null;
    isOn: boolean;
  };
}

const BCRoutput: FC<OutputObj> = ({ vRef, torch }) => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = 300;
    return instance;
  }, []);

  const handleNavigate = (barcode: string, bctype: string) => {
    navigate(`/${barcode}/${bctype}/barcode`);
  };

  const handleTorch = () => {
    console.log(torch.isAvailable, torch.isOn);
    if (toggle) {
      torch.on();
    } else {
      torch.off();
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    if (!vRef.current) return;
    reader.decodeFromConstraints(
      constraints,
      vRef.current,
      (result, _error) => {
        if (result)
          handleNavigate(
            result.getText(),
            result.getBarcodeFormat().toString()
          );
      }
    );
    return () => {
      reader.reset();
    };
  }, [vRef, reader]);

  return (
    <Fab
      sx={{
        position: "absolute",
        right: 25,
        bottom: 100,
        background: "#f5f5f573",
        border: "1px solid yellow",
      }}
      onClick={handleTorch}
    >
      {toggle ? <FlashlightOff /> : <FlashlightOn />}
    </Fab>
  );
};

export const BCR = () => {
  const [result, setResult] = useState("");

  const { ref, torch } = useZxing({
    paused: false,
    onResult: (r: Result) => setResult(r.getText()),
    constraints: { ...constraints },
    timeBetweenDecodingAttempts: 300,
  });

  return (
    <Grid2 container sx={{ background: "black", height: "75vh" }}>
      <Grid2
        size={{ xs: 12 }}
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
            top: "calc(50vh - 100px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              borderRight: "1px solid red",
              height: "200px",
              width: "100px",
              zIndex: 100
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
        <div className="video-container">
          <video ref={ref} />
          <div className="vid-mask"></div>
        </div>
      </Grid2>
      <BCRoutput vRef={ref} barcode={result} torch={torch} />
    </Grid2>
  );
};
