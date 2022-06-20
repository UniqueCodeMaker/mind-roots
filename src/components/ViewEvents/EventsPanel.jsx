// import react , {useState} from "react";

// import "../../App.css";
// import Table from 'react-bootstrap/Table';
// import moment from "moment";


// const EventPanel = (props) => {
    
//     return(
//        <>
//      {   

//         (moment(props.event.edate).format("YYYY-MM-DD") >= moment(Date.now() ).format('YYYY-MM-DD'))?
//         <div className="EventsPosts">
                 
//        <img src={props.event.EImageUrl} alt ="event" className="FixImgLen"/>
//         <div className="EventTimings">
       
//             <Table bordered    className="Eventtable table bg-dark text-light table-condensed table-responsive overflow-scroll " >
//             <thead>
//               <tr >
//                 <th className="col-sm-1 overflow-scroll h6 small">Lead </th>
//                 <th className="col-sm-1 overflow-scroll h6 small">Event Name</th>
//                 <th className="col-sm-1 overflow-scroll h6 small">Event Date</th>
//                 <th className="col-sm-1 overflow-scroll h6 small">Event Location</th>
//                 <th className="col-sm-1 overflow-scroll h6 small">Event Time</th>
//                 <th className="col-sm-1 overflow-scroll h6 small">Event Budget</th>
//                 <th className="col-sm-1 overflow-scroll h6 small">Event fees</th>
//                 </tr>
//             </thead>

//             <tbody>
                
//                 <td className="col-sm-1 overflow-scroll h6 small">{props.event.lead}</td>
//                 <td className="col-sm-1 overflow-scroll h6 small">{props.event.event}</td>
//                 <td className="col-sm-1 overflow-scroll h6 small">{moment(props.event.edate).format('YYYY-MM-DD')}</td>
//                 <td className="col-sm-1 overflow-scroll h6 small">{props.event.location}</td>
//                 <td className="col-sm-1 overflow-scroll h6 small">{moment(props.event.etime ,  "HH:mm:ss").format("hh:mm A")}</td>
//                 <td className="col-sm-1 overflow-scroll h6 small">{props.event.budget}</td>
//                 <td className="col-sm-1 overflow-scroll h6 small">{props.event.fees}</td> 

//             </tbody>




//             </Table>
//         </div>
        
//         </div>
//       :
//       <></>
//       }
//       </>
//         )


// }


// export default EventPanel;