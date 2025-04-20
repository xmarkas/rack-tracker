import { Grid2 } from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { useZxing } from "react-zxing";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library";

import { useNavigate } from "react-router-dom";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import Decoms from "../store/Decoms.model";
import { MoveType } from "../store/enums";

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

/**
 * BCRoutput - Scanner box element compenent
 * 
 * Processing in a different component to avoid re-rendering
 * 
 * @param param0 vRef - the ref to the video element
 * @returns The scan box for lining up the barcode
 */
const BCRoutput: FC<OutputObj> = ({ vRef }) => {
  const navigate = useNavigate();

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = 300;
    return instance;
  }, []);

  /**
   * handleNavigate
   * 
   * If a known barcode exists the app will navigate to the ThisRack compenent
   * and display additional information about the scanned rack.
   * 
   * @param barcode the scan result
   * @param bctype barcode type
   */
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

    // testing
    reader.decodeFromVideoContinuously(vRef.current, null, (res, _err) => {
      if (res) {
        console.log(res.getText());
        console.log(res.getResultMetadata());
        handleNavigate(res.getText(), res.getBarcodeFormat().toString());
      }
    });

    // reader.decodeFromConstraints(
    //   constraints,
    //   vRef.current,
    //   (result, _error) => {
    //     if (result)
    //       handleNavigate(
    //         result.getText(),
    //         result.getBarcodeFormat().toString()
    //       );
    //   }
    // );

    return () => {
      reader.reset();
    };
  }, [vRef, reader]);

  return (
    <div className="vid-mask">
      <div className="scan-targetH"></div>
    </div>
  );
};

/**
 * BCR
 * 
 * @returns Barcode Reader
 */
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
        <div className="video-container">
          <video
            ref={ref}
            style={{ minHeight: "100%", minWidth: "100%" }}
            autoFocus={true}
          />

          <BCRoutput vRef={ref} />
        </div>
      </Grid2>
    </Grid2>
  );
};
