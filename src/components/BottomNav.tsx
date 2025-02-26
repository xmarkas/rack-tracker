import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalShipping from "@mui/icons-material/LocalShipping";
import ConstructionIcon from "@mui/icons-material/Construction";
import FileUpload from "@mui/icons-material/FileUpload";
import Paper from "@mui/material/Paper";

import { FileUploader } from "./FileUploader.tsx";
import { useRef, useState } from "react";

export function BottomNav() {
  const [value, setValue] = useState(0);
  const parentRef: any = useRef();

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <FileUploader ref={parentRef} />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="SLC" icon={<ConstructionIcon />} />
          <BottomNavigationAction label="Rack Team" icon={<LocalShipping />} />
          <BottomNavigationAction
            label="Upload CSV"
            icon={<FileUpload />}
            onClick={() => {
              parentRef.current?.handleUploadClick();
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
