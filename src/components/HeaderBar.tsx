import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import packageJSON from "../../package.json";

const vercelToken: string = "OoEfoWGJ54rMDYukYEySaTJL";
const vercelEndPoint: string =
  "https://api.vercel.com/v9/projects/rack-tracker";
// const vercelProjectId: string = 'prj_Uf1QZe4p3eBnVv70ubdabWce81Rp';
const vApiConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${vercelToken}`,
  },
};

export function HeaderBar() {
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [deployment, setDeployment] = useState(packageJSON.version);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const forceUpdate = () => {
    window.location.href = window.location.href;
  };

  useEffect(() => {
    fetch(vercelEndPoint, vApiConfig)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          if (res.crons.updatedAt > deployment) {
          }
          setDeployment(res.crons.updatedAt);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ background: "white", color: "black", marginTop: "-5px" }}
    >
      <Container maxWidth="xl">
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
              <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
              </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// const settings = ["Account", "Dashboard", "Force Update", "Logout"];
