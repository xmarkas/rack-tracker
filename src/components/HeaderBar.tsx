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
import { useNavigate } from "react-router-dom";
import { FileUploader } from "./FileUploader.tsx";
import { sheetsLink } from "../tools/sheetsLink.ts";

export function HeaderBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
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
  }

  const handleBeta = (uri : string) => {
    navigate(`/${uri}`)
  }

  const forceUpdate = () => {
    navigate("/");
  };

  const handleDownload =() => {
    const filePath = sheetsLink();
    let link=document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
  }

  return (
    <AppBar
      position="static"
      sx={{ background: "white", color: "black", marginTop: "-5px" }}
    >
      <Container maxWidth="xl">
        <FileUploader ref={parentRef} />
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

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
              <MenuItem key={"force"} onClick={forceUpdate}>
                <Typography sx={{ textAlign: "center" }}>
                  Force Update
                </Typography>
              </MenuItem>
              <MenuItem key={"upload"} onClick={handleFileUpload}>
                <Typography sx={{ textAlign: "center" }}>Upload CSV</Typography>
              </MenuItem>
              {/* <MenuItem key={"beta"} onClick={() => handleBeta("beta")}>
                <Typography sx={{ textAlign: "center" }}>Beta Scan</Typography>
              </MenuItem> */}
              <MenuItem key={"betaC"} onClick={() => handleBeta("betaC")}>
                <Typography sx={{ textAlign: "center" }}>BetaC Scan</Typography>
              </MenuItem>
              {/* <MenuItem key={"download"} onClick={handleDownload}>
                <Typography sx={{ textAlign: "center" }}>CSV Link</Typography>
              </MenuItem> */}
              {/* <MenuItem key={"download"}>
                <a href={sheetsLink()} download="data_new.csv" style={{textDecoration: "none", color: "black"}}>Download CSV</a>
              </MenuItem> */}
              <MenuItem key={"download"} onClick={handleDownload}>
                 <Typography>Download</Typography>
              </MenuItem>
              {/* <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
              </MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
