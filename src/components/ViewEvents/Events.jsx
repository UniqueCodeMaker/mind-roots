import react , { useState , useLayoutEffect , useEffect } from "react";
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
    const TotalCount = Events.length;
    const notify = () => toast("User Deleted successfully", 
	{
	  transition: Zoom
	});
      var HandleEdit = async  function(i) {
       
      
      localStorage.setItem("Event" , i);
      navigate("/eventlist");

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


useLayoutEffect(() => {
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
  
  
 useLayoutEffect( () => {
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
    <label className="px-2 h5">Show</label> 
    <select className="px-2 h5" aria-label="Default select example" 
    onChange={(e)=>setLimit(Number(e.target.value))}
    >

  <option value="5" selected>5</option>
  <option value="10">10</option>
  <option value="15">15</option>
</select>
<label className="px-2 h5">entries</label>
</div>

<div className="MydataEnter">
  <input  className="px-2 h5 form-control border-light"
  onChange={(e)=>setSearch(e.target.value)}
  placeholder="Search Events"
  />
</div>
    </form>   
      <div className="HomeLogin3">
     <div className=" table-responsive-sm Res-table">

     { 
     
     Events?.length > 0 ? (
       <Table bordered   className="table bg-dark text-light table-condensed table-responsive overflow-scroll "  style={{ textAlign: "center" }}>
       <thead>
         <tr>
           <th className="col-sm-1 overflow-scroll h5 small">Id</th>
           <th className="col-sm-1 overflow-scroll h5 small">lead</th>
           <th className="col-sm-1 overflow-scroll h5 small">Event Name</th>
           <th className="col-sm-1 overflow-scroll h5 small">Date</th>
           <th className="col-sm-1 overflow-scroll h5 small">Location</th>
           <th className="col-sm-1 overflow-scroll h5 small">Time</th>
           <th className="col-sm-1 overflow-scroll h5 small">Budget</th>
           <th className="col-sm-1 overflow-scroll h5 small">Fees </th>
           <th className="col-sm-1 overflow-scroll h5 small">Admin </th>
         </tr>
       </thead>
       <tbody>
        
       {  Events.slice(Startvalue,Endvalue).map((Event,i) => (
                         
                         <tr> 
                         <td className=" overflow-scroll fst-italic h5 small">{i+1}</td>
                         <td className=" overflow-scroll fst-italic h5 small">{Event.lead}</td>
                         <td className=" overflow-scroll fst-italic h5 small">{Event.event}</td>
                         <td className=" overflow-scroll fst-italic h5 small">{moment(Event.edate).format('YYYY-MM-DD')}</td>
                         <td className=" overflow-scroll fst-italic h5 small">{Event.location}</td>
                         <td className=" overflow-scroll fst-italic h5 small">{moment(Event.etime ,  "HH:mm:ss").format("hh:mm A")}</td>
                         <td className=" overflow-scroll fst-italic h5 small">{Event.budget}</td>
                         <td className=" overflow-scroll fst-italic h5 small">{Event.fees}</td>
                         <td className=" overflow-scroll fst-italic h5 small TestFlex">
                          
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
 <label className=" h5 small">Showing</label> 
 <label className="px-2 h5 small">{Startvalue+1} to {sample} of {TotalCount}</label> 
     
<label className=" h5 small" >entries</label>
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

    </div>

      </>
      
        
    )


}


export default ViewEvent;