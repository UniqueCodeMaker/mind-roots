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
  import SideNavbar from "../../Sidebar";
const ViewEvent = () => {
    const [Events, setEvents] = useState([]);
    const [hiddens, sethiddens] = useState("hidden");
    const [DoneD , setDoneD] = useState("");
    const navigate = useNavigate();
    const[ Limit , setLimit]= useState(5);
    const [Search , setSearch] = useState("");
    const[Startvalue , setStartvalue]= useState(0);
    const[Endvalue , setEndvalue]= useState(5);
    const[page , setPage]= useState(1);
    const notify = () => toast("User Deleted successfully", 
	{
	  transition: Zoom
	});
      var HandleEdit = async  function(i) {
       
      
      localStorage.setItem("Event" , i);
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
      
        let arr = Events.filter(curr=>{
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
  
  const SearchVal = async() => {

    await fetch(`http://localhost:5000/SearchEve/${Search}`)
    .then((response) => response.json())
    .then((actualData) => setEvents(actualData)) 
    
  }


  useEffect( () => {
    if(Search!="")
{    SearchVal();
}
else
{
  test();
}

  }, [Search])
  
  
  useEffect( () => {
    setEndvalue(Limit)
    
  }, [Limit])

  let sample = 0;
  
  const IncrValue = () => {
    setPage(page+1)
    setStartvalue(Startvalue+5)
    setEndvalue(Endvalue+5)
 }
 
 const Decrvalue = () => {
   setPage(page-1)
  setStartvalue(Startvalue-5)
  setEndvalue(Endvalue-5)
}

    return(
      <>
<NavBar/>   
<SideNavbar/>
<form className="MyDataTable" > 
   <div className="MydataEnter">
    <label className="px-2 h4">Show</label> 
    <select className="px-2 h4" aria-label="Default select example" 
    onChange={(e)=>setLimit(Number(e.target.value))}
    >

  <option value="5" selected>5</option>
  <option value="10">10</option>
  <option value="15">15</option>
</select>
<label className="px-2 h4">entries</label>
</div>

<div className="MydataEnter">
  <label  className="px-2 h4 py-2">Search:</label>
  <input  className="px-2 h4 form-control"
  onChange={(e)=>setSearch(e.target.value)}
  />
</div>
    </form>   
      <div className="HomeLogin3">
     
     { 
     
        Events?.length > 0 ? (
          <Table bordered   className="table bg-dark text-light ">
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
           
          {  Events.slice(Startvalue,Endvalue).map((Event,i) => (
                            
                            <tr> 
                            <td>{i+1}</td>
                            <td>{Event.lead}</td>
                            <td>{Event.event}</td>
                            <td>{moment(Event.edate).format('YYYY-MM-DD')}</td>
                            <td>{Event.location}</td>
                            <td>{moment(Event.etime ,  "HH:mm:ss").format("hh:mm A")}</td>
                            <td>{Event.budget}</td>
                            <td>{Event.fees}</td>
                            <td>
                             
                              <div onClick={HandleDelete.bind(this, Event.id)} key={Event.id+91} className="rights">Delete</div>
                              <div onClick={HandleEdit.bind(this, Event.id)} key={Event.id+92} className="rights">Edit</div>
                              <div className="hidden">{sample = i+1}</div>
                            </td>
                            
                          </tr>
                  ))
                }  
        
           
          </tbody>
        </Table>
              
        ):(
          <div className="empty">
          <h2>No Events Exists</h2>
        </div>
        )
    
     }
     <div className="MyDataTable2" > 
   <div className="MydataEnter">
    <label className=" h4">Showing</label> 
    <label className="px-2 h4">{Startvalue+1} to {Endvalue} of {8}</label> 
        
<label className=" h4">entries</label>
</div>

<nav aria-label="Page navigation example ">
  <ul className="pagination">
    <li className="page-item" onClick={()=>Decrvalue()}><Link className="page-link" to=""><span className="TextBold">{`<<`}</span></Link></li>
    <li className="page-item"><Link className="page-link" to=""><span className="TextBold">{page}</span></Link></li>
  
    <li className="page-item" onClick={()=>IncrValue()}><Link className="page-link" to=""><span className="TextBold">{`>>`}</span></Link></li>
  </ul>
</nav>
    </div>
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


export default ViewEvent;