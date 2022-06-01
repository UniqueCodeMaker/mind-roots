import React,{ useState , useEffect }  from "react"
import "../../App.css";
import NavBar from "../NavBar"
import DaysLeft from "./DaysLeft.jsx"
import { useNavigate, Link } from "react-router-dom";
import SideNavbar from "../../Sidebar";
{/* <SideNavbar/> */}
const ClientPanel =()=>{

    localStorage.setItem("Clogin" , 1)
    localStorage.setItem("Role" , 2)
    const [PeriodLeft,setPeriodLeft] = useState("Membership Period");
    const [classBtn,setclassBtn] = useState("button-56 TopCornerRightmore");
    const Timer = <DaysLeft/>
    function HandleTime()
    {
        setPeriodLeft(

                Timer 
        )
   
        setclassBtn("button-56 Times TopCornerRight")
    }


    return(
   <>
   <NavBar/>
   <SideNavbar/>
   <div className="HomeLogin">
   
       <div className="FormPanel2">

   
   <Link to = "/ViewProfile"><button className="button-56 TopCornerRight" role="button">View Profile</button></Link>
  <button className={classBtn} role="button" onClick={HandleTime}>{PeriodLeft}</button>
   <Link to = "/ViewEvents"> <button className="button-56 TopCornerRightmore2" role="button">View Events</button></Link>
  
 </div>
      </div>
   </>
)


}

export default ClientPanel
