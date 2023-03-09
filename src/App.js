import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import SingleOrder from './pages/SingleOrder';
import NoMatch from './pages/NoMatch';
import CssBaseline from '@mui/material/CssBaseline'; // css normalize

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path={'/'} element={<Home />} ></Route>
        <Route path={'/cart'} element={<Cart />}></Route>
        <Route path={'/singleOrder'} element={<SingleOrder />}></Route>
        <Route path={'/singleProduct'} element={<SingleProduct />}></Route>
        <Route path={'*'} element={<NoMatch />}></Route>
      </Routes>
    </>
  );
}

export default App;
