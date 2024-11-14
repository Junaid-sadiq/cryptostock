import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Dashboard/Dashboard';
import ErrorComponent from './Components/Error/ErrorComponent';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Stock from './Components/Stock/Stock';
import Crypto from './Components/Crypto/Crypto';
import Cryptos from './Components/Cryptos/Cryptos';
import Stocks from './Components/Stocks/Stocks';
import Profile from './Components/Profile/Profile';
import Compare from './Components/Compare/Compare';
import Logout from './Components/Logout/Logout';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <BrowserRouter>
  <Routes>
    <Route path='/' Component={Home}/>
    <Route path='/login' Component={Login}/>
    <Route path='/profile' Component={Profile}/>
    <Route path='/register' Component={Register}/>
    <Route path='/Stock/:id' Component={Stock}/>
    <Route path='/Stocks' Component={Stocks}/>
    <Route path='/Crypto/:id' Component={Crypto}/>
    <Route path='/Cryptos' Component={Cryptos}/>
    <Route path='/Compare' Component={Compare}/>
    <Route path='/logout' Component={Logout}/>
    <Route path='*' Component={ErrorComponent}/>
  </Routes>
 </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
