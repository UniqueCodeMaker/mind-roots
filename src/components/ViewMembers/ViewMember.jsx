import react, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import "../../App.css";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar"
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from "../../Sidebar"
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
const ViewMember = () => {
  const [Members, setMembers] = useState([]);
  const [hiddens, sethiddens] = useState("hidden");
  const [DoneD, setDoneD] = useState("");
  const [Search , setSearch] = useState("");
  const navigate = useNavigate();
  const[ Limit , setLimit]= useState(5);
  const[Startvalue , setStartvalue]= useState(0);
  const[Endvalue , setEndvalue]= useState(5);
  const[page , setPage]= useState(1);

  const notify = () => toast("User Deleted successfully",
    {
      transition: Zoom
    });
    const notifyx = () => toast("You cant delete Logged In Only can edit",
    {
      transition: Zoom
    });
  var HandleEdit = async function (i) {


    localStorage.setItem("userSelect", i);
    navigate("/AddMember");

  }
const Login  =  localStorage.getItem("Login")
  var HandleDelete = async function (i) {
    let array = Members.filter(curr=>{
      return curr.id==i
    })
   
    sethiddens("DeletePop")
   if(array[0].name!=Login) 
   { 
     setDoneD(i)
    
   }
   else
   {
    setDoneD(0)
   }
    test();

  }

  
  const DeletedUsers = () => {
      // console.log(DoneD)
      if(DoneD!=0){
      fetch(`http://localhost:5000/Delete/${DoneD}`, { mode: 'cors' })
      .then((response) => {
    
        let arr = Members.filter(curr=>{
          return curr.id!==DoneD
        })

        
        setMembers(arr);
      });
    
    // notify();
    sethiddens("hidden")
    }
    else
    {
      notifyx();
    }
  }


  useEffect(() => {
    test();

  }, []);
  const test = async () => {
    await fetch(`http://localhost:5000/`)
      .then((response) => response.json())
      .then((actualData) => setMembers(actualData))
  }

  const SearchVal = async() => {

    await fetch(`http://localhost:5000/SearchVal/${Search}`)
    .then((response) => response.json())
    .then((actualData) => setMembers(actualData)) 
    
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
  return (
    <>
      <NavBar />
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
      <div className="HomeLogin3 ">
   
      <div className="table-responsive-md">
        {

          Members?.length > 0 ? (
            <Table  bordered className="table bg-dark text-light " style={{ textAlign: "center" }}>
              <thead >
                <tr>
                  <th  className="col-sm-1 " >Id</th>
                  <th className="col-sm-1">Name</th>
                  <th className="col-sm-2" >Email</th>
                  <th className="col-sm-2">Mobile</th>
                  <th className="col-sm-1">DOB</th>
                  <th className="col-sm-1">Gender</th>
                  <th className="col-sm-1">TransactionId</th>
                  <th>Admin </th>
                </tr>
              </thead>
              <tbody>

                {Members.slice(Startvalue,Endvalue).map((Member, i) => (
                  
                  <tr>
                    <td>{Startvalue+i+1}</td>
                    <td>{Member.name}</td>
                    <td>{Member.email}</td>
                    <td>{Member.mobile}</td>
                    <td>{moment(Member.dob).format('YYYY-MM-DD')}</td>
                    <td>{Member.gender}</td>
                    <td>{Member.transaction}</td>
                    <td>

                      <div onClick={HandleDelete.bind(this, Member.id)} key={Member.id+91} className="rights">Delete</div>
                      <div onClick={HandleEdit.bind(this, Member.id)} key={Member.id+92} className="rights">Edit</div>
                      <div className="hidden">{sample = i+1}</div>
                        
                    </td>
                  
                  </tr>
                ))
                }


              </tbody>
            </Table>

          ) : (
            <div className="empty">
              <h2>No Members Exists</h2>
            </div>
          )

        }

</div>
<div className="MyDataTable2" > 
   <div className="MydataEnter">
    <label className=" h4">Showing</label> 
    <label className="px-2 h4">{Startvalue+1} to {Endvalue} of {15}</label> 
        
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
          <p>Do you Really Want to Delete this User </p>
          <div className="DeletePopB">

            <button type="button" className="DeleteBtn" onClick={DeletedUsers}>Yes</button>
            <button type="button" className="DeleteBtn" onClick={() => sethiddens("hidden")}>Cancel</button>
          </div>
        </div>
        <ToastContainer />
        
      </div>
      
    </>


  )


}


export default ViewMember;