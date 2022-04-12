import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Orders from './pages/Orders/Orders';

/**
 * @description Handle all the routes
 */

 const Router = () => {
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="orders" element={<Orders />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
 }

 export default Router;