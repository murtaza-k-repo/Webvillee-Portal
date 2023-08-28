import React from 'react'
import { Navigate } from 'react-router-dom';

function Protected({ children }) {

  let user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children;
}
export default Protected;
