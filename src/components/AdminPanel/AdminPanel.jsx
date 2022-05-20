import React,{useState} from "react"
import "../../App.css";
import NavBar from "../NavBar"
import moment from "moment"
import { useNavigate, Link } from "react-router-dom";
const AdminPanel =()=>{
    // const [PeriodLeft,setPeriodLeft] = useState("View Members");

    localStorage.setItem("Alogin" , 1)


//     let Mydate ;
//   Mydate = moment("12:00:00.000000" ,  "HH:mm:ss").format("hh:mm A")
//     console.log(Mydate)






    return(
<>
<NavBar/>

<div className="HomeLogin">
       <div className="FormPanel2">
       {/* <span className="Logo2">
                    <img src={Logo} alt="Logo" />
                </span> */}
   
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
