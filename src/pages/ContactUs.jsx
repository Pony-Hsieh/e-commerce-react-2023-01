import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Link,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { flexCenter } from "../styles/muiCommonStyle";

function ContactUs() {
  return (
    <>
      <NavBar />

      <Box component="main"
        sx={(theme) => ({
          padding: theme.spacing(4),
        })}
      >
        <Typography component="h1"
          variant="h3"
          align="center"
        >
          聯繫我們
        </Typography>
        {/* 嵌入地圖 */}
        <Box sx={(theme) => ({
          overflow: "hidden",
          ...flexCenter(),
          maxWidth: "100%",
          maxHeight: "450px",
          marginTop: theme.spacing(4),
        })}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.8147640380553!2d121.5122878!3d25.040359599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90a870e5af1%3A0x180e1a442209d1c1!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A6YeN5oW25Y2X6Lev5LiA5q61MTIy6Jmf!5e0!3m2!1szh-TW!2stw!4v1680592818211!5m2!1szh-TW!2stw"
            width="600"
            height="450"
            style={{
              border: 0,
            }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </Box>
        <Container maxWidth="sm"
          sx={(theme) => ({
            marginTop: theme.spacing(4),
          })}
        >
          <Stack spacing={4}>
            {/* 連絡地址 */}
            <Grid container>
              <Grid item xs={3} sm={1}>
                <Box sx={{
                  ...flexCenter(),
                  height: "100%",
                }}>
                  <LocationOnIcon />
                </Box>
              </Grid>
              <Grid item xs={9} sm={11}>
                <Box>
                  <Typography variant="h5" component="h3">
                    連絡地址
                  </Typography>
                  <Typography variant="body1" component="p">
                    台北市中正區重慶南路一段122號
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            {/* 連絡電話 */}
            <Grid container>
              <Grid item xs={3} sm={1}>
                <Box sx={{
                  ...flexCenter(),
                  height: "100%",
                }}>
                  <LocalPhoneIcon />
                </Box>
              </Grid>
              <Grid item xs={9} sm={11}>
                <Box>
                  <Typography variant="h5" component="h3">
                    連絡電話
                  </Typography>
                  <Link href="tel:+886-2-2320-6239"
                    variant="body1"
                    underline="none"
                  >
                    02-2320-6239
                  </Link>
                </Box>
              </Grid>
            </Grid>
            {/* 連絡 email */}
            <Grid container>
              <Grid item xs={3} sm={1}>
                <Box sx={{
                  ...flexCenter(),
                  height: "100%",
                }}>
                  <EmailIcon />
                </Box>
              </Grid>
              <Grid item xs={9} sm={11}>
                <Box>
                  <Typography variant="h5" component="h3">
                    連絡 email
                  </Typography>
                  <Link href="mailto:public_web@oop.gov.tw"
                    variant="body1"
                    underline="none"
                  >
                    public_web@oop.gov.tw
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </>
  );
}

export default ContactUs;
