import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import Home from "./components/HomeScreen/Home.jsx"
import Applyform from "./components/Applyform/Applyform.jsx"
import ClientPanel from "./components/ClientPanel/ClientPanel.jsx"
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx"
import ViewProfile from "./components/ClientPanel/ViewProfile.jsx"
import NavBar from "./components/NavBar.jsx"
import AddEvent from "./components/AdminPanel/AddEvent.jsx"
import SignUp from "./components/SignUp"
import AddMember from "./components/AdminPanel/AddMember"
import ViewEvents from "./components/ViewEvents/ViewEvents.jsx"
import ViewMember from "./components/ViewMembers/ViewMember.jsx"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      
      <Route path="/" element={< Home/>} />
      <Route path="Home" element={<Home />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="Applyform" element={<Applyform />} />
      <Route path="ViewProfile" element={<ViewProfile />} />
      <Route path="ViewEvents" element={<ViewEvents />} />
      <Route path="AddMember" element={<AddMember />} />
      <Route path="ViewMember" element={<ViewMember/>} />
      <Route path="AddEvent" element={<AddEvent />} />
      <Route path="ClientPanel" element={<ClientPanel />} />
      <Route path="AdminPanel" element={<AdminPanel />} />

   
   
   
   
    </Routes>
  </BrowserRouter>

);


