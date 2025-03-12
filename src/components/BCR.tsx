import { Grid2 } from "@mui/material";




export const BRC = () => {
 

  return (
    <Grid2 container={true}>
      <Grid2 size={{xs:12}} style={{border: "1px solid red", height: "100%", width: "100%"}}>
      <video   style={{zIndex:1000}} playsInline={true}
      />
      <span> {import.meta.env.VITE_GID}</span>
      </Grid2>
      
    </Grid2>
  );
};
