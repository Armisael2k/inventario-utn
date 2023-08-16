import { useState } from "react";
import Link from "next/link";
import signOut from "@/hooks/account/signOut";
import { useRouter } from "next/router";
import stringAvatar from "@/utils/stringAvatar";
import { pages } from "@/configs/pages";
import {
  Dashboard as DashboardIcon,
  Menu as MenuIcon
} from "@mui/icons-material";
import {
  Box,
  Menu,
  MenuItem,
  Button,
  Toolbar,
  Container,
  AppBar,
  Typography,
  Tooltip,
  Avatar,
  IconButton
} from "@mui/material";

const title = { default: "Administración", abbr: "Admin" }

const settings  = [
  {
    title:  "Cerrar sesión",
    behavior: signOut
  }
];


function Navbar({ account }) {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="relative">
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ path, title, hidden }) => ( !hidden ?
                <MenuItem key={path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              : null ))}
            </Menu>
          </Box>

          <DashboardIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 500,
              letterSpacing: ".1rem",
              textTransform: "uppercase"
            }}
          > 
            {title.abbr}
          </Typography>

          <DashboardIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}/>
          <Typography
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              textTransform: "uppercase"
            }}
          >
            {title.default}
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ path, title, hidden }) => ( !hidden ?
              <Button
                component={Link}
                href={path}
                key={path}
                sx={{
                  color: "white",
                  fontWeight: router.pathname === path ? 700 : 400,
                  textDecorationLine: router.pathname === path ? "underline" : "none",
                  textUnderlineOffset: 5,
                  textDecorationThickness: 2,
                  ":hover": {
                    textDecorationLine: router.pathname === path ? "underline" : "none",
                    textDecorationThickness: 2,
                  }
                }}
              >
                {title}
              </Button>
            : null ))}
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones" arrow>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "#025C90" }}>{stringAvatar(account.name)}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              {settings.map(({ title, behavior }) => (
                <MenuItem
                  key={title}
                  onClick={behavior}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar;