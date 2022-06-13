import react , {useState , useLayoutEffect} from "react";
import EventPanel from "./EventsPanel.jsx";
import "../../App.css";
import NavBar from "../NavBar";
import moment from "moment";
import SideNavbar from "../../Sidebar"
const ViewEvents = () => {
    const [Events, setEvents] = useState([
      
     
    ]);

    const [Check,setCheck ] = useState(); 
const searchv = localStorage.getItem("search")

console.log(searchv)
useLayoutEffect(() => {
          test2();
        
     
    }, []);
        const test2 = async ()=>
        {
    await fetch(`http://localhost:5000/View`)
        .then((response) => response.json())
        .then((actualData) => {setEvents(actualData)
        
        })
    }
  

const [hiddens, sethiddens] = useState("hidden");


const  DeletedUsers  =  () => {

    
     sethiddens("hidden")
   }

    return(
     
     <>
     <NavBar/>
     
    {/* <SideNavbar/> */}
     <div className="HomeLogin5" >
     <div className={hiddens}>
       <p>Do you Really Want to Delete this User </p>
       <div className="DeletePopB">
       
       <button type="button" className="DeleteBtn"  onClick={DeletedUsers}>Yes</button>
       <button type="button" className="DeleteBtn" onClick={() => sethiddens("hidden")}>Cancel</button>
     </div>
     </div>
{Events?.length > 0 ? (
<div className="EventPanelView" onclick={()=>sethiddens("DeletePop")}>
{Events.map((event) => (
<EventPanel event={event} />

)




)}

</div>
) : (
<div className="empty">
<h2>No event found</h2>
</div>
)}    





</div>

     </>
      
        
    )


}


export default ViewEvents;