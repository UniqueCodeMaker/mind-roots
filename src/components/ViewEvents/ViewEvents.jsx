import react , {useState , useEffect} from "react";
import EventPanel from "./EventsPanel.jsx";
import "../../App.css";
import NavBar from "../NavBar";

const ViewEvents = () => {
    const [Events, setEvents] = useState([
      
     
    ]);

    const [Check,setCheck ] = useState(); 
const searchv = localStorage.getItem("search")
localStorage.setItem("search", " ")

useEffect(() => {
        if(searchv.length > 1)
        {
         
          test3();
          console.log("3")
        }
        else
        {
          test2();
          console.log("2")
        }

    
    }, []);
        const test2 = async ()=>
        {
    await fetch(`http://localhost:5000/View`)
        .then((response) => response.json())
        .then((actualData) => {setEvents(actualData)
        
        })
    }
  
    const test3 = async ()=>
    {
await fetch(`http://localhost:5000/search/${searchv}`)
    .then((response) => response.json())
    .then((actualData) => {setEvents(actualData)
    
    })
}

// console.table(Events)

const [hiddens, sethiddens] = useState("hidden");


const  DeletedUsers  =  () => {

    
     sethiddens("hidden")
   }

    return(
     
     <>
     <NavBar/>
     <div className="HomeLogin2" >
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

))}

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