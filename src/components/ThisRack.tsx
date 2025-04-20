import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import { UnsetMove, SLC, Decom } from "../store/models";
import { useParams } from "react-router-dom";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import Decoms from "../store/Decoms.model";
import { Row } from "tinybase";
import { Action, MoveType } from "../store/enums";

export const ThisRack = () => {
  const [rack, setRack] = useState<Row>({});
  const [rackMove, setRackMove] = useState<Row>({});
  const rowId: string = useParams().rowId || "";
  const moveType = useParams().moveType || "";
  
  useEffect(() => {
    if (moveType === MoveType.MOVE) {
      let thisRack = { unset: Moves.byId(rowId), set: Slcs.byId(rowId) };
      let set: Row = {};
      let unset: Row = {};
    
      // Find both destination and origin for rack
      if (thisRack.set.serialNumber && !thisRack.unset.serialNumber) {
        unset = Moves.byId(thisRack.set.originID.toString());
        set = thisRack.set;
      } else if (!thisRack.set.serialNumber && thisRack.unset.serialNumber) {
        set = Slcs.byId(thisRack.unset.destinationID.toString())
        unset = thisRack.unset;
      }

      // Check if rack has arrived to destination position
      if (set.inPosition) {
        setRack(set);
        setRackMove(unset);
      } else {
        setRack(unset);
        setRackMove(set);
      }
    } else if (moveType === MoveType.INBOUND) {
      setRack(Slcs.byId(rowId));
    } else if (moveType === MoveType.DECOM) {
      setRack(Decoms.byId(rowId));
    }
  }, []);

  const status = (row: Row) => {
        if (row.action === Action.SLC) {
            return row.slcSET ? "Complete" : row.inPosition ? "In position" : "Transit";
        } else if (row.action === Action.UNSET) {
            return row.unset ? "Complete" : "Incomplete";
        }
  }

  return (
    <Grid2 container py={3} px={2} size={{ xs: 12 }}>
      {/* Row 1 */}
      <Grid2 size={{ xs: 12 }}>
        <Grid2 size={{ xs: 12 }} textAlign={"center"} mb={2}>
          <Typography
            variant="h5"
            sx={{ border: "1px solid lightgray", borderRadius: 3 }}
          >
            Serial {rack?.serialNumber}
          </Typography>
        </Grid2>
      </Grid2>
      {/*  */}
      <Grid2 container size={{ xs: 12 }} mb={2} textAlign={"center"}>
        <Grid2 size={{ xs: 6 }}>
          <Typography fontWeight={600}>Current Location</Typography>
          <Typography>{rack?.location}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Typography fontWeight={600}>Type</Typography>
          <Typography>{rack?.moveType}</Typography>
        </Grid2>
      </Grid2>
      {/*  */}
      <Grid2 container size={{ xs: 12 }} my={2} textAlign={"center"}>
        <Grid2 size={{ xs: 6 }}>
          <Typography fontWeight={600}>Status</Typography>
          <Typography>
            {status(rack)}
          </Typography>
        </Grid2>
      </Grid2>
      {/*  */}
      {moveType === MoveType.MOVE && (
        <Grid2 container size={{ xs: 12 }} my={2} py={2} textAlign={"center"} borderTop={"1px solid lightgray"}>
          <Grid2 size={{ xs: 6 }}>
            <Typography fontWeight={600}>{rackMove.destinationID ? "Origin" : "Destination"}</Typography>
            <Typography>{rackMove.location}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Typography fontWeight={600}>{rackMove.destinationID ? "Origin Status" : "Destination Status"}</Typography>
            <Typography>{status(rackMove)}</Typography>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};
