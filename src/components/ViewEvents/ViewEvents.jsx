import react , {useState , useEffect} from "react";
import EventPanel from "./EventsPanel.jsx";
import "../../App.css";

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


    return(
       <div className="HomeLogin2">

            {Events?.length > 0 ? (
        <div className="EventPanelView">
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

      
        
    )


}


export default ViewEvents;