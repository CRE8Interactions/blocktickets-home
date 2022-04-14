import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { RequireAuth } from './context/Auth/Auth';
import App from './App';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import Events from './pages/Events/Events';
import Sales from './pages/Sales/Sales';
import Login from './pages/Login/Login';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route path="/" element={
        <RequireAuth>
           <App />
        </RequireAuth>
      }>
        <Route path="events" element={<Events />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="sales" element={<Sales />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
