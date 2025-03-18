import { Fab, Grid2 } from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { useZxing } from "react-zxing";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";
// import { FlashlightOff, FlashlightOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import Decoms from "../store/Decoms.model";
import { MoveType } from "../store/types";

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
  torch?: {
    on: () => Promise<void>;
    off: () => Promise<void>;
    isAvailable: boolean | null;
    isOn: boolean;
  };
}

const BCRoutput: FC<OutputObj> = ({ vRef }) => {
  const navigate = useNavigate();

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = 300;
    return instance;
  }, []);

  const handleNavigate = (barcode: string, bctype: string) => {
    // Get serialNumber and moveType, search each table for result
    const rowId = {
      Unset: Moves.bySerialNumber("mRack", barcode),
      Decom: Decoms.bySerialNumber("dRack", barcode),
      SLC: Slcs.bySerialNumber("sRack", barcode),
    };

    if (rowId.Unset && rowId.SLC) {
      navigate(`/${rowId.Unset}/${MoveType.MOVE}/thisrack`);
    } else if (rowId.SLC) {
      navigate(`/${rowId.SLC}/${MoveType.INBOUND}/thisrack`);
    } else if (rowId.Decom) {
      navigate(`/${rowId.Decom}/${MoveType.DECOM}/thisrack`);
    } else {
      // When barcode is not in database
      navigate(`/${barcode}/${bctype}/barcode`);
    }
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
        right: "20%",
        bottom: 100,
        background: "#f5f5f573",
        border: "1px solid yellow",
        display: "none",
      }}
      onClick={() => handleNavigate("50427739", "C128")}
    ></Fab>
  );
};

export const BCR = () => {
  const { ref } = useZxing({
    paused: false,
    constraints: { ...constraints },
    timeBetweenDecodingAttempts: 300,
  });

  return (
    <Grid2 container sx={{ background: "black" }}>
      <Grid2
        size={{ xs: 12 }}
        display={"flex"}
        // width={"100vw"}
        // height={"75vh"}
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
            top: "calc(38vh - 100px)",
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
        <div className="video-container">
          <video ref={ref} style={{ minHeight: "100%", minWidth: "100%" }} />
          <div className="vid-mask"></div>
        </div>
      </Grid2>
      <BCRoutput vRef={ref} />
    </Grid2>
  );
};
