import React,{useState} from "react"
import "../../App.css";
import NavBar from "../NavBar"
import DaysLeft from "./DaysLeft.jsx"
const ClientPanel =()=>{

    localStorage.setItem("Clogin" , 1)
    const [PeriodLeft,setPeriodLeft] = useState("Membership Period");
    const [classBtn,setclassBtn] = useState("button-56");
    const Timer = <DaysLeft/>
    function HandleTime()
    {
        setPeriodLeft(

                Timer 
        )

        setclassBtn("button-56 Times")
    }

    return(
   <>
   <NavBar/>
   <div className="HomeLogin">
   
       <div className="FormPanel2">
       {/* <span className="Logo2">
                    <img src={Logo} alt="Logo" />
                </span> */}
   
   <a href="ViewProfile"><button className="button-56" role="button">View Profile</button></a>
  <button className={classBtn} role="button" onClick={HandleTime}>{PeriodLeft}</button>
   <a href="AddEvent"> <button className="button-56" role="button">View Events</button></a>
   <a href="ViewEvents"> <button className="button-56" role="button">Upcoming Events</button></a>
 </div>
      </div>
   </>
)

}

export default ClientPanel
