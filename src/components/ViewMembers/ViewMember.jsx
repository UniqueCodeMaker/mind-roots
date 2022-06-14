import react, { useState, useEffect , useLayoutEffect } from "react";
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
  const[ Limit , setLimit]= useState(5);
  const[Startvalue , setStartvalue]= useState(0);
  const[Endvalue , setEndvalue]= useState(5);
  const[page , setPage]= useState(1);
  const[ToggleName , setToggleName] = useState(0);
  const[ToggleEmail , setToggleEmail] = useState(0);
  const navigate = useNavigate();
  const TotalCount = Members.length;
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
    navigate("/addmember");

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



 useLayoutEffect(() => {
  fetch(`http://localhost:5000/testdata/${ToggleName}`)
  .then((response) => response.json())
  .then((actualData) => setMembers(actualData))
}, [ToggleName]);

useLayoutEffect(() => {
  fetch(`http://localhost:5000/testemail/${ToggleEmail}`)
  .then((response) => response.json())
  .then((actualData) => setMembers(actualData)) 
}, [ToggleEmail]);


  
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


 useLayoutEffect(() => {
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


 useLayoutEffect( () => {
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
    setStartvalue(Startvalue+Limit)
    setEndvalue(Endvalue+5)
 }

 const Decrvalue = () => {
  setPage(page-1)
  setStartvalue(Startvalue-Limit)
  setEndvalue(Endvalue-5)
}
  return (
    <>
      <NavBar />
      <SideNavbar/>
      <form className="MyDataTable" > 
   <div className="MydataEnter">
    <label className="px-2 h5 ">Show</label> 
    <select className="px-2 h5 " aria-label="Default select example" 
    onChange={(e)=>setLimit(Number(e.target.value))}

    >

  <option value="5" selected>5</option>
  <option value="10">10</option>
  <option value="15">15</option>
</select>
<label className="px-2 h5 ">entries</label>
</div>

<div className="MydataEnter">
  <input  className="px-2 h4 form-control border-light"
  onChange={(e)=>setSearch(e.target.value)}
  placeholder="Search Members"

  />
</div>
    </form>
      <div className="HomeLogin3 ">
   
      <div className="table-responsive-sm Res-table">
        {

          Members?.length > 0 ? (
            <Table  bordered className="table bg-dark text-light table-condensed table-responsive overflow-scroll" style={{ textAlign: "center" }}>
              <thead >
                <tr>
                
                  <th  className="col-sm-1 overflow-scroll h6 small"  >Id</th>
                  <th className="col-sm-1 overflow-scroll h6 small" 
                  style={{cursor: "pointer"}} 
                  onClick={()=>setToggleName(!ToggleName)}
                  >Name</th>
                  <th className="col-sm-2 overflow-scroll h6 small" 
                  style={{cursor: "pointer"}}
                  onClick={()=>setToggleEmail(!ToggleEmail)}
                  >Email</th>
                  <th className="col-sm-2 overflow-scroll h6 small">Mobile</th>
                  <th className="col-sm-1 overflow-scroll h6 small">DOB</th>
                  <th className="col-sm-1  overflow-scroll h6 small">Gender</th>
                  <th className="col-sm-2 overflow-scroll h6 small">TransactionId</th>
                  <th className="overflow-scroll h6 small">Admin </th>
                </tr>
              </thead>
              <tbody>

                {Members.slice(Startvalue,Endvalue).map((Member, i) => (
                  
                  <tr>
                    <td className=" overflow-scroll fst-italic h6 small">{Startvalue+i+1}</td>
                    <td className=" overflow-scroll fst-italic h6 small">{Member.name}</td>
                    <td className=" overflow-scroll fst-italic h6 small">{Member.email}</td>
                    <td className=" overflow-scroll fst-italic h6 small">{Member.mobile}</td>
                    <td className=" overflow-scroll fst-italic h6 small">{moment(Member.dob).format('YYYY-MM-DD')}</td>
                    <td className=" overflow-scroll fst-italic h6 small">{Member.gender}</td>
                    <td className=" overflow-scroll fst-italic h6 small">{Member.transaction}</td>
                    <td className="overflow-scroll fst-italic h6 small TestFlex">

                      <div onClick={HandleDelete.bind(this, Member.id)} key={Member.id+91} className="rights">Delete</div>
                      <div onClick={HandleEdit.bind(this, Member.id)} key={Member.id+92} className="rights">Edit</div>
                      <div className="hidden">{sample =Startvalue + i+1}</div>
                        
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
    <label className=" h5 small">Showing</label> 
    <label className="px-1 h5 small">{Startvalue+1} to {sample} of {TotalCount}</label> 
        
<label className=" h5 small ">entries</label>
</div>

<nav aria-label="Page navigation example  " className="bg-transparent">
  <ul className="pagination bg-transparent">
  <li className="page-item"  
  onClick={page==1?( ()=>{} ):()=>Decrvalue()}
  ><Link className="page-link" to=""><span className="TextBold">{page-1}</span></Link></li>        
    <li className="page-item" onClick={page==1?( ()=>{} ):()=>Decrvalue()}><Link className="page-link" to=""><span className="TextBold">{`<<`}</span></Link></li>
    <li className="page-item"><Link className="page-link" to=""><span className="TextBold">{page}</span></Link></li>
   
    <li className="page-item"  onClick={sample>=TotalCount?( ()=>{} ):()=>IncrValue()}><Link className="page-link" to=""><span className="TextBold">{`>>`}</span></Link></li>
    <li className="page-item" onClick={sample>=TotalCount?( ()=>{} ):()=>IncrValue()}><Link className="page-link" to=""><span className="TextBold">{page+1}</span></Link></li>
    
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