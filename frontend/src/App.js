import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import PasswordForm from './pages/ForgotPassword';
import Layout from './layout/Layout';

function App() {

  return (

    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/forgot-password" element={<PasswordForm />} />

      </Route>
      
    </Routes>
    </BrowserRouter>


  );
}

export default App;
