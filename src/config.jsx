import { Navigate } from 'react-router-dom'
 const isUserLoggedInToken = () => localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
 const Role = () => localStorage.getItem('Role') ? localStorage.getItem('Role') : sessionStorage.getItem('Role')

export const ProtectedRoute = ({ isLoggedin, children }) => {
  console.log("CHeck" , isUserLoggedInToken())
  if (isUserLoggedInToken()==null || isUserLoggedInToken()==0) {
    return <Navigate to={"/signup"} replace />;
  }
  return children;
};


export const AuthRoute = ({ isLoggedin, children }) => {
  // console.log("OUT" ,isUserLoggedInToken())
  
  if (isUserLoggedInToken()!="0" || isUserLoggedInToken()!=0 ) 
  {
    // console.log("CHeckAuth" , isUserLoggedInToken())
    return <Navigate to={-1}  replace />;
  }
  else if (Role()=="0")
  {
  
    return <Navigate to="/home"  replace />;

    
  }
  return children;
};