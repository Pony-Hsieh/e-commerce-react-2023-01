import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import SingleOrder from './pages/SingleOrder';
import Shop from './pages/Shop';
import ContactUs from './pages/ContactUs';
import NoMatch from './pages/NoMatch';
import CssBaseline from '@mui/material/CssBaseline'; // css normalize
import { createTheme, ThemeProvider } from '@mui/material';
import {
  Box,
} from '@mui/material';

const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: "#012A60",
      contrastText: "#fff",
    },
    secondary: {
      main: "#89D1C3",
      contrastText: "#012A60",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          backgroundColor: "#D1D9E2",
        }}>
          <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/cart'} element={<Cart />}></Route>
            <Route path={'/shop'} element={<Shop />}></Route>
            <Route path={'/singleOrder'} element={<SingleOrder />}></Route>
            <Route path={'/singleProduct'} element={<SingleProduct />}></Route>
            <Route path={'/contactUs'} element={<ContactUs />}></Route>
            <Route path={'*'} element={<NoMatch />}></Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
