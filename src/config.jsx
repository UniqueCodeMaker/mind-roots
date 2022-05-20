import {  Navigate }   from 'react-router-dom'
// export const isUserLoggedInToken = () => localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
// export const isUserLoggedIn = () => localStorage.getItem('userData') ? localStorage.getItem('userData') : sessionStorage.getItem('userData')
// export const userData = () => JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : JSON.parse(sessionStorage.getItem('userData'))


export const isUserLoggedInToken = () => 1
export const isUserLoggedIn = () => 1
export const userData = () => localStorage.getItem('Role')


export const ProtectedRoute = ({ isLoggedin, children }) => {
    if (!isLoggedin.isUserLoggedIn() && !isLoggedin.isUserLoggedInToken() && !isLoggedin.userData()) {
      return <Navigate to={`/Home`} replace />;
    }
    return children;
  };
  
  
