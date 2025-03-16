import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import { UnsetMove, SLC, Decom } from "../store/models";
import { useParams } from "react-router-dom";
import Moves from "../store/Moves.model";
import Slcs from "../store/Slcs.model";
import Decoms from "../store/Decoms.model";
import { Row } from "tinybase";

export const ThisRack = () => {
    const [rack, setRack] = useState<Row>({});
    const [destination, setDestination] = useState<Row>({});
    const rowId: string = useParams().rowId || "";
    const action: string = useParams().action || "";

    useEffect(() => {
        if (action === "Unset") {
            let unset = Moves.byId(rowId);
            let slc = Slcs.byId(unset.destinationID.toString());
            setDestination(slc);
            setRack(unset);
        } else if (action === "SLC") {
            setRack(Slcs.byId(rowId));
        } else if (action === "Decom") {
            setRack(Decoms.byId(rowId));
        }
    },[])

  return (
    <Grid2 container py={3} px={2} size={{xs:12}}>
      {/* Row 1 */}
      <Grid2 size={{ xs: 12 }} >
        <Grid2 size={{ xs: 12 }} textAlign={"center"} mb={2}>
          <Typography variant="h5" sx={{border: "1px solid lightgray", borderRadius: 3}}>Serial {rack?.serialNumber}</Typography>
        </Grid2>
      </Grid2>
      {/*  */}
      <Grid2 container size={{xs:12}} mb={2} textAlign={"center"}>
        <Grid2 size={{ xs: 6 }}>
          <Typography fontWeight={600}>Current Location</Typography>
          <Typography>{rack?.location}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Typography fontWeight={600}>Type</Typography>
          <Typography>{rack?.action}</Typography>
        </Grid2>
      </Grid2>
      {/*  */}
      <Grid2 container size={{xs:12}} mb={2} textAlign={"center"}>
        <Grid2 size={{ xs: 6 }}>
          <Typography fontWeight={600}>Status</Typography>
          <Typography>{rack?.auditComplete ? "Complete" : "Incomplete"}</Typography>
        </Grid2>
      </Grid2>
      {/*  */}
      {action === "Unset" &&
      <Grid2 container size={{xs:12}} mb={2} textAlign={"center"}>
        <Grid2 size={{ xs: 6 }}>
          <Typography fontWeight={600}>Destination</Typography>
          <Typography>{destination.location}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Typography fontWeight={600}>Destination Status</Typography>
          <Typography>{destination.location}</Typography>
        </Grid2>
      </Grid2>}
    </Grid2>
  );
};
