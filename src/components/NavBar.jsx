import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import logo from '../images/logo-white.webp';


function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const buttonColor = location.pathname === "/" ? "#fff" : "";

  const [drawerOpenStatus, setDrawerOpenStatus] = useState(false);

  function toggleDrawer() {
    setDrawerOpenStatus(!drawerOpenStatus);
  }

  /** 跳轉到指定頁面
   * 跳轉前會先檢查是否與當前頁面一致；如果是的話，則不跳轉
   * @param {string} targetPath - 目標路徑
   * @param {"mobile"|undefined} layout - 目前版型
   */
  function goToPage(targetPath, layout) {
    if (targetPath === location.pathname && layout === "mobile") {
      toggleDrawer();
      return;
    }
    navigate(targetPath);
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
            <ListItemButton component="a"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                goToPage("/", "mobile");
              }}
            >首頁</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                goToPage("/shop", "mobile");
              }}
            >商城</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                goToPage("/cart", "mobile");
              }}
            >購物車</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                goToPage("/contactUs", "mobile");
              }}
            >聯繫我們</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a"
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
          <Grid item xs={2}>
            <Box sx={(theme) => ({
              padding: theme.spacing(2),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}>
              <Box component="img"
                src={logo}
                sx={{
                  maxHeight: "48px"
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box component="ul"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0",
                padding: "0",
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
                  component="a"
                  size="large"
                  sx={{
                    width: "25%",
                    color: buttonColor,
                  }}
                  onClick={() => {
                    goToPage("/");
                  }}
                >
                  首頁
                </Button>
                <Button
                  component="a"
                  size="large"
                  sx={{
                    width: "25%",
                    color: buttonColor,
                  }}
                  onClick={() => {
                    goToPage("/shop");
                  }}
                >商城</Button>
                <Button
                  component="a"
                  size="large"
                  sx={{
                    width: "25%",
                    color: buttonColor,
                  }}
                  onClick={() => {
                    goToPage("/cart");
                  }}>購物車</Button>
                <Button
                  component="a"
                  size="large"
                  sx={{
                    width: "25%",
                    color: buttonColor,
                  }}
                  onClick={() => {
                    goToPage("/contactUs");
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
