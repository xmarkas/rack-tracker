import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import { BottomNavigationAction } from "@mui/material";
import LocalShipping from "@mui/icons-material/LocalShipping";
import ConstructionIcon from "@mui/icons-material/Construction";
import FileUpload from "@mui/icons-material/FileUpload";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Inspector } from "tinybase/ui-react-inspector";

import { FileUploader } from "./FileUploader.tsx";
import { useRef, useState } from "react";

export function BottomNav() {
  const [value, setValue] = useState("");
  const parentRef: any = useRef();
  const n = useNavigate();

  const menuChange = (_event: any, newValue: string) => {
    if (newValue === "upload") {
      parentRef.current?.handleUploadClick();
    } else if (["slc", "rack"].includes(newValue)) {
      setValue(newValue);
      n(`/${newValue}`);
    }
  };
  return (
    <Box sx={{ pb: 10 }}>
      <CssBaseline />
      <FileUploader ref={parentRef} />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "75px" }}
        elevation={5}
      >
        <BottomNavigation showLabels value={value} onChange={menuChange}>
          <BottomNavigationAction
            value="slc"
            label="SLC"
            icon={<ConstructionIcon />}
          />
          <BottomNavigationAction
            value="rack"
            label="Rack Team"
            icon={<LocalShipping />}
          />
          <BottomNavigationAction
            value="upload"
            label="Upload CSV"
            icon={<FileUpload />}
          />
          <Inspector position="right"/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
