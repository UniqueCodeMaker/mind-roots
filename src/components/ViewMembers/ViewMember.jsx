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
  var HandleEdit = async function (i) {


    localStorage.setItem("userSelect", i);
    navigate("/AddMember");

  }

  var HandleDelete = async function (i) {

    sethiddens("DeletePop")
    setDoneD(i)

    test();

  }

  const DeletedUsers = () => {

      fetch(`http://localhost:5000/Delete/${DoneD}`, { mode: 'cors' })
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
  const test = async () => {
    await fetch(`http://localhost:5000/`)
      .then((response) => response.json())
      .then((actualData) => setEvents(actualData))
  }


  return (
    <>
      <NavBar />
      <div className="HomeLogin">
      <div className="table-responsive-md">
        {

          Members?.length > 0 ? (
            <Table striped bordered hover className="table " style={{ textAlign: "center" }}>
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
                    <td>{Member.id}</td>
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