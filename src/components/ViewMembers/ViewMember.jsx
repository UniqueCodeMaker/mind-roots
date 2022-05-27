import react, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import "../../App.css";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar"
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
const ViewMember = () => {
  const [Members, setEvents] = useState([]);
  const [hiddens, sethiddens] = useState("hidden");
  const [DoneD, setDoneD] = useState("");
  const [Status, setStatus] = useState("Inactive");
  const navigate = useNavigate();
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

        
        setEvents(arr);
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
      .then((actualData) => setEvents(actualData))
  }


  return (
    <>
      <NavBar />
      <div className="HomeLogin3 ">
      <div className="table-responsive-md">
        {

          Members?.length > 0 ? (
            <Table  bordered className="table bg-dark text-light " style={{ textAlign: "center" }}>
              <thead >
                <tr>
                  <th  class="col-sm-1 " >Id</th>
                  <th class="col-sm-1">Name</th>
                  <th class="col-sm-2" >Email</th>
                  <th class="col-sm-2">Mobile</th>
                  <th class="col-sm-1">DOB</th>
                  <th class="col-sm-1">Gender</th>
                  <th class="col-sm-1">TransactionId</th>
                  <th>Admin </th>
                </tr>
              </thead>
              <tbody>

                {Members.map((Member, i) => (
                  
                  <tr>
                    <td>{i+1}</td>
                    <td>{Member.name}</td>
                    <td>{Member.email}</td>
                    <td>{Member.mobile}</td>
                    <td>{moment(Member.dob).format('YYYY-MM-DD')}</td>
                    <td>{Member.gender}</td>
                    <td>{Member.transaction}</td>
                    <td>

                      <div onClick={HandleDelete.bind(this, Member.id)} key={Member.id+91} className="rights">Delete</div>
                      <div onClick={HandleEdit.bind(this, Member.id)} key={Member.id+92} className="rights">Edit</div>
                    
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