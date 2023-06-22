import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SocialContext } from '../context/SocialContext';

export const RequireAuth = ({ children }) => {
  let location = useLocation();
  const { state } = useContext(SocialContext);
  return state.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};
