import React,{useState} from "react"
import "../../App.css";
import NavBar from "../NavBar"
import moment from "moment"
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
   
       <a href="ViewMember"><button className="button-56 " role="button" >View Members</button></a>
       <a href="AddEvent"><button className="button-56" role="button">Add Events</button></a>
       <a href="ViewEvents"><button className="button-56" role="button">View Events</button></a>
       <a href="Events"><button className="button-56" role="button">Edit Events</button></a>
       <a href="AddMember"><button className="button-56" role="button">Add Member</button></a>

     


       </div>
        
       
    
    
    
    
    
    
    </div>

</>


)

}

export default AdminPanel
