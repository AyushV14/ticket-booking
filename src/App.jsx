import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetStarted from './assets/GetStarted';
import Signuplogin from './assets/Auth/Signup-login';
import UserDashboard from './assets/dashboard/UserDashboard';
import AdminLogin from './assets/admin/AdminLogin'; // Import the AdminLogin component
import AdminMain from './assets/admin/AdminPage'; // Import the AdminMain component
import { AuthProvider, useAuth } from './AuthProvider';
import MovieDetails from './assets/dashboard/components/moviedetails/MovieDetails';

const AppRoutes = () => {
  const { PrivateRoute,AdminRoute } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/login" element={<Signuplogin />} />
      <Route path="/dashboard" element={<PrivateRoute element={<UserDashboard />} />} />
      <Route path="/admin" element={<AdminLogin />} /> {/* Admin login route */}
      <Route path="/admin/main" element={<PrivateRoute element={<AdminMain />} />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
