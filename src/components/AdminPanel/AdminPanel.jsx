import React,{useState} from "react"
import "../../App.css";

const AdminPanel =()=>{
    // const [PeriodLeft,setPeriodLeft] = useState("View Members");

    localStorage.setItem("Alogin" , 1)

    return(
   <div className="HomeLogin">
       <div className="FormPanel2">
       {/* <span className="Logo2">
                    <img src={Logo} alt="Logo" />
                </span> */}
   
       <a href="AddMember"><button className="button-56" role="button">Add Member</button></a>
       <a href="ViewMember"><button className="button-56 " role="button" >View Members</button></a>
       <a href="AddEvent"><button className="button-56" role="button">Add Events</button></a>
       <a href="ViewEvents"><button className="button-56" role="button">View Events</button></a>



       </div>
        
       
    
    
    
    
    
    
    </div>
)

}

export default AdminPanel
