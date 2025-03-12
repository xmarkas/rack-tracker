import { Grid2 } from "@mui/material";

const gid = process.env.VITE_GID
const blah = import.meta.env.VITE_GID

export const BCR = () => {
 console.log("-->", gid)

  return (
    <Grid2 container={true}>
      <Grid2 size={{xs:12}} style={{border: "1px solid red", height: "100%", width: "100%"}}>
      <video   style={{zIndex:1000}} playsInline={true}
      />
      <span>nope {gid}{blah}</span>
      </Grid2>
      
    </Grid2>
  );
};
