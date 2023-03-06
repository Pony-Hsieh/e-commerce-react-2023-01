import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import SingleOrder from './pages/SingleOrder';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home />} ></Route>
        <Route path={'/singleOrder'} element={<SingleOrder />}></Route>
        <Route path={'/singleProduct'} element={<SingleProduct />}></Route>
      </Routes>
    </>
  );
}

export default App;
