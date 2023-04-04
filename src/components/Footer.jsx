import {
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { flexCenter } from '../styles/muiCommonStyle';
import logo from '../images/temp-logo.png';


function Footer() {
  return (
    <Box component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        backgroundImage: "linear-gradient(180deg, #d1d9e2 0%, #012A60 100%);"
      })}
    >
      <Grid container>
        {/* 版權宣告 */}
        <Grid item xs={12} md={4}>
          <Box sx={{
            ...flexCenter(),
            height: "100%",
          }}>
            <Typography variant="h6" component="p">
              © {new Date().getFullYear()} All rights reserved.
            </Typography>
          </Box>
        </Grid>
        {/* logo */}
        <Grid item xs={12} md={4}>
          <Box sx={{
            ...flexCenter(),
            height: "100%",
          }}>
            <Box component="img" src={logo} alt="logo" draggable="false" />
          </Box>
        </Grid>
        {/* 社群媒體 */}
        <Grid item xs={12} md={4}>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              height: "100%",
              ...flexCenter(),
            }}
          >
            <IconButton href="https://www.facebook.com/"
              size="large"
              color="contrastWhite"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://www.instagram.com/"
              size="large"
              color="contrastWhite"
              target="_blank"
              rel="noreferrer noopener"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://www.twitter.com/"
              size="large"
              color="contrastWhite"
              target="_blank"
              rel="noreferrer noopener"
            >
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
