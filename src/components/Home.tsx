import { Box } from "@mui/material";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/slc");
  }, 3000);

  return (
    <Box id="app">
      <h3 style={{ padding: 5, marginLeft: 5 }}>Refactoring.....</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          
          width: "100%",
          height: "400px"
        }}
      >
        <img src={"/icon-512x512.png"}  width={"150vw"} style={{objectFit:"contain"}}/>
        <h3 style={{marginLeft: 30}}>Rack Logistics</h3>
      </div>
    </Box>
  );
};
