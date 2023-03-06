import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home />} ></Route>
        <Route path={'/singleProduct'} element={<SingleProduct />}></Route>
      </Routes>
    </>
  );
}

export default App;
