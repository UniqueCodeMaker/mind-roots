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
import ParticlesBg from "particles-bg";
import About from "./components/About"


import '.././src/App.css'
import { ProtectedRoute  , AuthRoute } from './config.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
const isUserLoggedInToken = localStorage.getItem('token');

let config = {
  num: [10, 30],
  rps: 3.8,
  radius: [0, 100],
  life: [1.5, 3],
  v: [2, 3],
  tha: [-40, 40],
  alpha: [0.6, 0],
  scale: [.1, 0.4],
  position: "all",
  color: ["random", "#ff0000"],
  cross: "dead",
  // emitter: "follow",
  random: 15
};

if (Math.random() > 0.85) {
  config = Object.assign(config, {
    onParticleUpdate: (ctx, particle) => {
      ctx.beginPath();
      ctx.rect(
        particle.p.x,
        particle.p.y,
        particle.radius * 2,
        particle.radius * 2
      );
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
    }
  });
}
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<>

<BrowserRouter>

     <ParticlesBg type="custom" config={config} bg={true} />
   
    <Routes>
    <Route exact path={`/SignUp`} 
    element={<AuthRoute isLoggedin={{ isUserLoggedInToken }}><SignUp /></AuthRoute>} />
      <Route path="/" element={< Home/>} />
      <Route path="Home" element={<Home />} />
     
      <Route path="Applyform" element={<Applyform />} />
      <Route path="About" element={<About/>} />
      <Route path="ViewProfile" element={<ProtectedRoute isLoggedin={{isUserLoggedInToken}}><ViewProfile /></ProtectedRoute>} />
      <Route path="ViewEvents" element={<ProtectedRoute isLoggedin={   {isUserLoggedInToken} }><ViewEvents /></ProtectedRoute>} />
      <Route path="AddMember" element={<ProtectedRoute isLoggedin={   { isUserLoggedInToken } }><AddMember /></ProtectedRoute>} />
      <Route path="ViewMember" element={<ProtectedRoute isLoggedin={   { isUserLoggedInToken } }><ViewMember/></ProtectedRoute>} />
      <Route path="AddEvent" element={<ProtectedRoute isLoggedin={   { isUserLoggedInToken } }><AddEvent /></ProtectedRoute>} />
      <Route path="ClientPanel" element={<ProtectedRoute isLoggedin={   { isUserLoggedInToken } }><ClientPanel /></ProtectedRoute>} />
      <Route path="AdminPanel" element={<ProtectedRoute isLoggedin={   { isUserLoggedInToken } }><AdminPanel /></ProtectedRoute>} />
      <Route path="EventList" element={<ProtectedRoute isLoggedin={   isUserLoggedInToken }><EventList/></ProtectedRoute>} />
      <Route path="Events" element={<ProtectedRoute isLoggedin={  { isUserLoggedInToken }}><Events/></ProtectedRoute>} />

   
   
   
    </Routes>
  </BrowserRouter>

  </>
);


