import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import SingleOrder from './pages/SingleOrder';
import NoMatch from './pages/NoMatch';
import CssBaseline from '@mui/material/CssBaseline'; // css normalize
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  spacing: 8,
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path={'/'} element={<Home />}></Route>
          <Route path={'/cart'} element={<Cart />}></Route>
          <Route path={'/singleOrder'} element={<SingleOrder />}></Route>
          <Route path={'/singleProduct'} element={<SingleProduct />}></Route>
          <Route path={'*'} element={<NoMatch />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
