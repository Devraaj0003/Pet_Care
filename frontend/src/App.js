import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './routes/Login';
import Register from './routes/Register';
import Landing from './routes/Landing';
import AdminLogin from './routes/AdminLogin';
import Dashboard from './routes/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import MyBookings from './components/MyBookings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
