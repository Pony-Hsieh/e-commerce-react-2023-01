import NavBar from "../components/NavBar";
import {
  Box,
  Typography,
} from '@mui/material';
import bannerImage from '../images/banner.jpeg';

function Home() {
  return (
    <>
      <Box sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        color: "#f8ffff",
        backgroundImage: `url(${bannerImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
        <NavBar />
        <Typography component="h3"
          variant="h2"
          sx={(theme) => ({
            position: "absolute",
            bottom: theme.spacing(2),
            left: theme.spacing(2),
          })}
        >
          少，<br />
          但是更好
        </Typography>
      </Box>
    </>
  );
}

export default Home;
