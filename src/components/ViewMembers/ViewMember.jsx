import react , { useState , useEffect } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import "../../App.css";
import NavBar from "../NavBar"
const ViewMember = () => {
    const [Members, setEvents] = useState([
   
    ]);


      var HandleEdit = async  function(i) {
       
      
      localStorage.setItem("userSelect" , i);
      window.open("http://localhost:3000/AddMember","_self",false);

      }

      var HandleDelete = async function(i) {
        

        console.log(i);
        await fetch(`http://localhost:5000/Delete/${i}` , {mode: 'cors'})
        .then((response) => console.log(response))
        
        // test();
  
      }




 useEffect(() => {
   test();
  
}, []);
   const test = async ()=>
   {
    await fetch(`http://localhost:5000/`)
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
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>TransactionId</th>
              <th>Admin </th>
            </tr>
          </thead>
          <tbody>
           
          {  Members.map((Member,i) => (
                            
                            <tr> 
                            <td>{Member.id}</td>
                            <td>{Member.name}</td>
                            <td>{Member.email}</td>
                            <td>{Member.mobile}</td>
                            <td>{Member.dob}</td>
                            <td>{Member.gender}</td>
                            <td>{Member.transaction}</td>
                            <td>
                             
                              {/* <button  type="button" className="rights"  >Delete</button> */}
                              {/* <button type="button" className="rights"  >Edit</button> */}
                              <div onClick={HandleDelete.bind(this, Member.id)} key={Member.id} className="rights">Delete</div>
                              <div onClick={HandleEdit.bind(this, Member.id)} key={Member.id} className="rights">Edit</div>
                              {/* <div onClick={HandleEdit.bind(this, i)} key={i} className="rights">Edit</div> */}
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
     
      

    </div>

      </>
      
        
    )


}


export default ViewMember;