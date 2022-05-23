import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import "./index.css"
import Home from "./components/HomeScreen/Home.jsx"
import Applyform from "./components/Applyform/Applyform.jsx"
import ClientPanel from "./components/ClientPanel/ClientPanel.jsx"
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx"
import ViewProfile from "./components/ClientPanel/ViewProfile.jsx"

import AddEvent from "./components/AdminPanel/AddEvent.jsx"
import SignUp from "./components/SignUp"
import AddMember from "./components/AdminPanel/AddMember"
import ViewEvents from "./components/ViewEvents/ViewEvents.jsx"
import ViewMember from "./components/ViewMembers/ViewMember.jsx"
import EventList from "./components/ViewEvents/EventList.jsx"
import Events from "./components/ViewEvents/Events"

import { ProtectedRoute } from './config.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
const isUserLoggedInToken = localStorage.getItem('token');
// console.log(isUserLoggedInToken)
// console.log(isUserLoggedInToken)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      
      <Route path="/" element={< Home/>} />
      <Route path="Home" element={<Home />} />
      <Route path="SignUp" element={<SignUp /> } />
      <Route path="Applyform" element={<Applyform />} />
      <Route path="ViewProfile" element={<ProtectedRoute isLoggedin={isUserLoggedInToken}><ViewProfile /></ProtectedRoute>} />
      <Route path="ViewEvents" element={<ProtectedRoute isLoggedin={   isUserLoggedInToken }><ViewEvents /></ProtectedRoute>} />
      <Route path="AddMember" element={<ProtectedRoute isLoggedin={   isUserLoggedInToken }><AddMember /></ProtectedRoute>} />
      <Route path="ViewMember" element={<ProtectedRoute isLoggedin={   isUserLoggedInToken }><ViewMember/></ProtectedRoute>} />
      <Route path="AddEvent" element={<ProtectedRoute isLoggedin={   isUserLoggedInToken }><AddEvent /></ProtectedRoute>} />
      <Route path="ClientPanel" element={<ProtectedRoute isLoggedin={   isUserLoggedInToken }><ClientPanel /></ProtectedRoute>} />
      <Route path="AdminPanel" element={<ProtectedRoute isLoggedin={   isUserLoggedInToken }><AdminPanel /></ProtectedRoute>} />
      <Route path="EventList" element={<ProtectedRoute isLoggedin={   isUserLoggedInToken }><EventList/></ProtectedRoute>} />
      <Route path="Events" element={<ProtectedRoute isLoggedin={  isUserLoggedInToken}><Events/></ProtectedRoute>} />

   
   
   
    </Routes>
  </BrowserRouter>


);


