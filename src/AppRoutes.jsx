import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GetStarted from './assets/GetStarted';
import Signuplogin from './assets/Auth/Signup-login';
import UserDashboard from './assets/dashboard/UserDashboard';
import AdminLogin from './assets/admin/AdminLogin'; 
import AdminMain from './assets/admin/AdminPage'; 
import MovieDetails from './assets/dashboard/components/moviedetails/MovieDetails';
import { useAuth } from './AuthProvider';

const AppRoutes = ({ userInfo, selectedLocation, onLocationChange, onSearch, searchResults }) => {
  const { PrivateRoute } = useAuth();
    
  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/login" element={<Signuplogin />} />
      <Route path="/dashboard" element={<PrivateRoute element={<UserDashboard />} />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/main" element={<PrivateRoute element={<AdminMain />} />} />
      <Route path="/movie/:id" element={
        <PrivateRoute element={
          <MovieDetails 
            userInfo={userInfo} 
            selectedLocation={selectedLocation} 
            onLocationChange={onLocationChange} 
            onSearch={onSearch} 
            searchResults={searchResults} 
          />
        } />
      } />
    </Routes>
  );
};

export default AppRoutes;
