import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import { BottomNavigationAction } from "@mui/material";
import LocalShipping from "@mui/icons-material/LocalShipping";
import ConstructionIcon from "@mui/icons-material/Construction";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ForwardIcon from "@mui/icons-material/Forward";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function BottomNav({ selectedNavs = [], barcode, bgColor = "white" }: any) {
  const [value, setValue] = useState("");
  const n = useNavigate();

  const menuChange = (_event: any, newValue: string) => {
    
    if (["slc", "rack"].includes(newValue)) {
      setValue(newValue);
      n(`/${newValue}`);
    } else if (newValue === "back") {
      n(-1);
    } else if (newValue === "scan") {
      n('/scan')
    } 
    
  };

  const navItems = (val: number) => {
    const items = [
      {
        value: "back",
        label: barcode ? barcode : "",
        icon: <ForwardIcon sx={{ rotate: "180deg", fontSize: 40 }} />,
      },
      {
        value: "slc",
        label: "SLC Team",
        icon: <ConstructionIcon />,
      },
      {
        value: "rack",
        label: "Rack Team",
        icon: <LocalShipping />,
      },
      {
        value: "scan",
        label: "Barcode",
        icon: <PhotoCameraIcon />,
      },
    ];

    const styles = {
      color: bgColor === "transparent" ? "white" : "black",
    }

    return (
      <BottomNavigationAction
        key={items[val].value}
        value={items[val].value}
        label={items[val].label}
        icon={items[val].icon}
        sx={styles}
        
      />
    );
  };

  return (
    <Box sx={{ pb: 10 }}>
      <CssBaseline />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "80px", zIndex: 500, background: bgColor }}
        elevation={5}
      >
        <BottomNavigation showLabels value={value} onChange={menuChange} sx={{background: bgColor}}>
          {selectedNavs.map((item: any) => navItems(item))}
        </BottomNavigation>
      </Paper>
     
    </Box>
  );
}
