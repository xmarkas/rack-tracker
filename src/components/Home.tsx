import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getDeploymentTime } from "../tools/forceUpdate";

export const Home = () => {
  const navigate = useNavigate();

  // Check for Vercel update
  const check = async () => {
    let result = await getDeploymentTime();
    if (result) {
      setTimeout(() => {
        navigate("/slc");
      }, 2000);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <Box id="app">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",

          width: "100vw",
          height: "100vh",
        }}
      >
        <img
          src={"/icons/icon-512x512.png"}
          width={"150vw"}
          style={{ objectFit: "contain", marginLeft: -50 }}
        />
        <h3 style={{ marginLeft: -40 }}>Rack Logistics</h3>
      </div>
    </Box>
  );
};
