import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './Pages/home'
import HomeTwo from './Pages/home_two'
import Login from './Pages/login'
import Register from './Pages/register'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="app" element={<Home/>}/>
        <Route path="app_two" element={<HomeTwo/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
