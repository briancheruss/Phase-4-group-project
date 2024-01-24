// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import PasswordForm from './pages/ForgotPassword';
import Layout from './layout/Layout';
import PropertyListings from './pages/PropertyListings';
import PropertyDetails from './pages/PropertyDetails'; // Import the new component
import UserProvider from './context/UserContext';


function App() {
  return (
    <BrowserRouter>
    <UserProvider>
    <Routes>

      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/forgot-password" element={<PasswordForm />} />
        <Route path="listings" element={<PropertyListings />} />
        <Route path="listings/:id" element={<PropertyDetails />} /> {/* Add this line */}

      </Route>
      
    </Routes>
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
