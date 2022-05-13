import react from "react";

import "../../App.css";
import Table from 'react-bootstrap/Table';
import NavBar from "../NavBar"
const EventPanel = (props) => {

// console.log(props.event);
    return(
        <>
        <div className="EventsPosts">

<img src={props.event.EImageUrl} alt ="event" className="FixImgLen"/>
 <div className="EventTimings">

     <Table striped bordered hover  className="Eventtable">
     <thead>
       <tr >
         <th>Lead </th>
         <th>Event Name</th>
         <th>Event Date</th>
         <th>Event Location</th>
         <th>Event Time</th>
         <th>Event Budget</th>
         <th>Event fees</th>
         </tr>
     </thead>

     <tbody>

    
         <td>{props.event.lead}</td>
         <td>{props.event.event}</td>
         <td>{props.event.edate}</td>
         <td>{props.event.location}</td>
         <td>{props.event.etime}</td>
         <td>{props.event.budget}</td>
         <td>{props.event.fees}</td> 

     </tbody>




     </Table>
 </div>
 <div className="EventTitle">
 <h1>{props.event.eventName}</h1>
 </div>

 </div>  
        </>
      
    )


}


export default EventPanel;