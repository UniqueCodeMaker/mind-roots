import React,{useState} from "react"
import "../../App.css";
import NavBar from "../NavBar"
import moment from "moment"
import { useNavigate, Link } from "react-router-dom";
const AdminPanel =()=>{

    localStorage.setItem("Alogin" , 1)





    return(
<>
<NavBar/>

<div className="HomeLogin">
       <div className="FormPanel2">
   
       <Link to="/ViewMember"><button className="button-56 " role="button" >View Members</button></Link>
       <Link to="/AddEvent"><button className="button-56" role="button">Add Events</button></Link>
       <Link to="/ViewEvents"><button className="button-56" role="button">View Events</button></Link>
       <Link to="/Events"><button className="button-56" role="button">Edit Events</button></Link>
       <Link to="/AddMember"><button className="button-56" role="button">Add Member</button></Link>

     


       </div>
        
       
    
    
    
    
    
    
    </div>

</>


)

}

export default AdminPanel
