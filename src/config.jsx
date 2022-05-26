import { Navigate } from 'react-router-dom'
 const isUserLoggedInToken = () => localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
// export const isUserLoggedIn = () => localStorage.getItem('userData') ? localStorage.getItem('userData') : sessionStorage.getItem('userData')
// export const userData = () => JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : JSON.parse(sessionStorage.getItem('userData'))


export const ProtectedRoute = ({ isLoggedin, children }) => {
  console.log("CHeck" , isUserLoggedInToken())
  if (isUserLoggedInToken()==null || isUserLoggedInToken()==0) {
    return <Navigate to={"/SignUp"} replace />;
  }
  return children;
};


export const AuthRoute = ({ isLoggedin, children }) => {
  console.log("OUT" , isUserLoggedInToken())
 
  if (!isUserLoggedInToken()) 
  {
    console.log("CHeckAuth" , isUserLoggedInToken())
    return <Navigate to={-1}  replace />;
  }
  return children;
};