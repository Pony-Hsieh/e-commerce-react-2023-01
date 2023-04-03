import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/temp-logo.png';


function NavBar() {
  const location = useLocation();
  const buttonColor = location.pathname === "/" ? "#fff" : "";

  const [drawerOpenStatus, setDrawerOpenStatus] = useState(false);

  function toggleDrawer() {
    setDrawerOpenStatus(!drawerOpenStatus);
  }

  return (
    <>
      {/* md 為斷點 */}

      {/* 開啟 drawer 按鈕 */}
      <Button variant="contained"
        onClick={toggleDrawer}
        sx={(theme) => ({
          position: "fixed",
          top: theme.spacing(2),
          right: theme.spacing(2),
          zIndex: 99,
          display: {
            md: "none"
          }
        })}
      >
        <MenuIcon />
      </Button>

      {/* M 版 nav */}
      <Drawer
        anchor="right"
        open={drawerOpenStatus}
        onClose={toggleDrawer}
      >
        <List>
          <ListItem>
            <ListItemButton component={Link}
              to="/"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              首頁
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link}
              to="/shop"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              商城
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link}
              to="/cart"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              購物車
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link}
              to="/contactUs"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              聯繫我們
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link}
              onClick={toggleDrawer}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* PC 版 nav */}
      <Box sx={{
        display: {
          xs: "none",
          md: "block",
          backdropFilter: "blur(500px)",
        }
      }}>
        <Grid container>
          <Grid item xs={1}>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Box component="img"
                src={logo}
                sx={{
                  maxHeight: "64px"
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={11}>
            <Box component="ul"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0",
                width: "100%",
                height: "100%",
              }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                  width: "100%",
                }}
              >
                <Button
                  component={Link}
                  to="/"
                  size="large"
                  sx={{
                    width: "25%",
                    color: buttonColor,
                  }}>首頁</Button>
                <Button
                  component={Link}
                  to="/shop"
                  size="large"
                  sx={{
                    width: "25%",
                    color: buttonColor,
                  }}>商城</Button>
                <Button
                  component={Link}
                  to="/cart"
                  size="large"
                  sx={{
                    width: "25%",
                    color: buttonColor,
                  }}>購物車</Button>
                <Button
                  component={Link}
                  to="/contactUs"
                  size="large"
                  sx={{
                    width: "25%",
                    color: buttonColor,
                  }}>聯繫我們</Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default NavBar;
