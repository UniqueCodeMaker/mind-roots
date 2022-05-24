import react , { useState , useEffect } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import "../../App.css";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
  import moment from 'moment'
const ViewMember = () => {
    const [Members, setEvents] = useState([]);
    const [hiddens, sethiddens] = useState("hidden");
    const [DoneD , setDoneD] = useState("");
    const navigate = useNavigate();
    const notify = () => toast("User Deleted successfully", 
	{
	  transition: Zoom
	});
      var HandleEdit = async  function(i) {
       
      
      localStorage.setItem("userSelect" , i);
      navigate("/EventList");

      }

      var HandleDelete = async function(i) {
        
        sethiddens("DeletePop")
        setDoneD(i)
        
        test();
  
      }

     const  DeletedUsers  =  () => {

       fetch(`http://localhost:5000/DeletEvents/${DoneD}` , {mode: 'cors'})
       .then((response) => {
      
        let arr = Members.filter(curr=>{
          return curr.id!==DoneD
        })
    
        setEvents(arr);
      });
    
        notify();
        sethiddens("hidden")
      }


 useEffect(() => {
   test();
  
}, []);
   const test = async ()=>
   {
    await fetch(`http://localhost:5000/view`)
   .then((response) => response.json())
   .then((actualData) => setEvents(actualData))
  }
  
 

    return(
      <>
<NavBar/>      
      <div className="HomeLogin">
     
     { 
     
        Members?.length > 0 ? (
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>lead</th>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Time</th>
              <th>Budget</th>
              <th>Fees </th>
              <th>Admin </th>
            </tr>
          </thead>
          <tbody>
           
          {  Members.map((Member,i) => (
                            
                            <tr> 
                            <td>{Member.id}</td>
                            <td>{Member.lead}</td>
                            <td>{Member.event}</td>
                            <td>{moment(Member.edate).format('YYYY-MM-DD')}</td>
                            <td>{Member.location}</td>
                            <td>{moment(Member.etime ,  "HH:mm:ss").format("hh:mm A")}</td>
                            <td>{Member.budget}</td>
                            <td>{Member.fees}</td>
                            <td>
                             
                              <div onClick={HandleDelete.bind(this, Member.id)} key={Member.id+91} className="rights">Delete</div>
                              <div onClick={HandleEdit.bind(this, Member.id)} key={Member.id+92} className="rights">Edit</div>
                              
                            </td>
                            
                          </tr>
                  ))
                }  
        
           
          </tbody>
        </Table>
              
        ):(
          <div className="empty">
          <h2>No Members Exists</h2>
        </div>
        )
    
     }
     
     {/* DeletePop */}
     <div className={hiddens}>
       <p>Do you Really Want to Delete this Event </p>
       <div className="DeletePopB">
       
       <button type="button" className="DeleteBtn"  onClick={DeletedUsers}>Yes</button>
       <button type="button" className="DeleteBtn" onClick={() => sethiddens("hidden")}>Cancel</button>
     </div>
     </div>
      <ToastContainer/>

    </div>

      </>
      
        
    )


}


export default ViewMember;