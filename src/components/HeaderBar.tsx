import { useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import packageJSON from "../../package.json";
import { FileUploader } from "./FileUploader.tsx";
import { PciLink, sheetsLink } from "../tools/sheetsLink.ts";

export function HeaderBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const parentRef: any = useRef(); // For uploading CSV

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleFileUpload = () => {
    parentRef.current?.handleUploadClick();
    handleCloseUserMenu();
  };

  const AtnDownload = () => {
    const filePath = sheetsLink();
    let link = document.createElement("a");
    link.href = filePath;
    link.download = "ATNsheet";
    link.click();
  };

  const PciDownload = () => {
    const filePath = PciLink();
    let link = document.createElement("a");
    link.href = filePath;
    link.download = "PCIsheet";
    link.click();
  }

  return (
    <AppBar
      position="sticky"
      sx={{ background: "white", color: "black", top: "-2px", height: "60px" }}
    >
      <Container maxWidth="xl">
        <FileUploader ref={parentRef} />
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RACK.app
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RACK.app
          </Typography>
          <span style={{ marginRight: 4 }}>{packageJSON.version}</span>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"account"} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Account</Typography>
              </MenuItem>
              <MenuItem key={"upload"} onClick={handleFileUpload}>
                <Typography sx={{ textAlign: "center" }}>Upload CSV</Typography>
              </MenuItem>

              <MenuItem key={"atn"} onClick={AtnDownload}>
                <Typography>ATN Download</Typography>
              </MenuItem>
              <MenuItem key={"pci"} onClick={PciDownload}>
                <Typography>PCI Download</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
