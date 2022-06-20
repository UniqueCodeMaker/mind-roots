import react, { useState, useEffect , useLayoutEffect } from "react";
import { Trash , Edit } from "react-feather"
import "../../App.css";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar"
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css';
import DataTable, { createTheme } from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "react-data-table-component-extensions/dist/index.css";

import SideNavbar from "../../Sidebar"
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
createTheme('solarized', {
  text: {
    primary: 'white',
    secondary: 'white',
  },

  background: {
    default: '#283046',
   
  },
 
  divider: {
    // default: 'white',
  },
  action: {
    button: 'black',
    hover: 'black',
    disabled: 'black',
  }
  
});

const ViewEvent = () => {
  const [hiddens, sethiddens] = useState("hidden");
  const [DoneD, setDoneD] = useState("");
  const [Search , setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0)

  const handlePagination = page => setCurrentPage(page.selected)


  const navigate = useNavigate();
  // const TotalCount = Members.length;
  const notify = () => toast("User Deleted successfully",
    {
      transition: Zoom
    });
    const notifyx = () => toast("You cant delete Logged In Only can edit",
    {
      transition: Zoom
    });
  var HandleEdit = async function (i) {


    localStorage.setItem("event", i);
    navigate("/eventlist");

  }
const Login  =  localStorage.getItem("Login")
  var HandleDelete = async function (i) {
    let array = data.filter(curr=>{
      return curr.id==i
    })
   
    sethiddens("DeletePop")
 
     setDoneD(i)
 
  }

// console.log(data);



  
  const DeletedUsers = () => {
      // console.log(DoneD)
      if(DoneD!=0){
      fetch(`http://localhost:5000/DeletEvents/${DoneD}`, { mode: 'cors' })
      .then((response) => {
    
        let arr = data.filter(curr=>{
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

  const userdata = async()=>{
    await fetch('http://localhost:5000/view')
    .then(response => response.json())
    .then((text)=>{setMembers(text)
      console.log(text)
    })
    .catch((error)=>{console.log(error)})
    .finally(() => {console.log('done')})
}
  const SearchVal = async() => {

    await fetch(`http://localhost:5000/search/${Search}`)
    .then((response) => response.json())
    .then((actualData) => setMembers(actualData)) 
    
  }


 useLayoutEffect( () => {
    if(Search!="")
{   
   SearchVal();
}
else
{
  userdata();
}

  }, [Search])


 
  const [data , setMembers] = useState([{
  }]);
  
  useEffect(() => {
     
      userdata();
      

    }, []);
     const columns = [
    
     
      {
          name: "Id",
          
          sortable: false,
          width: "4rem"  ,
          cell: (row, index) => index+1    
        },
        {
          name: "Leader",
          selector: "lead",
          sortable: true ,
          width: "6rem"    
          
        },
        {
          name: "Name",
          selector: "event",
          sortable: true
          ,width: "6rem"
        },
        {
          name: "Date",
          selector: "edate",
          sortable: true,
          width: "6rem",
        },
        {
          name: "Time",
          selector: "etime",
          sortable: true,
          width: "6rem"
        },
        {
          name: "Location",
          selector: "location",
          sortable: true,
          width: "9rem"
        
        },
        
   
        {
          name: "Budget",
          selector: "budget",
          sortable: true
        },
      {
        name: "Fees",
        selector: "fees",
        sortable: true,
        width: "10rem",
       
      
      
      }, 
      {
        name: "Action",
        sortable: false,
        selector: "null",
        width: "6rem",
        cell: row => (
          <div className="d-flex flex   justify-content-around w-100">
           <Edit onClick={()=>HandleEdit(row.id)}/>
            <Trash onClick={()=>HandleDelete(row.id)}/>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        
        
      
      
      }

    ];
    return(
        <>
      <NavBar />
      <SideNavbar/>
      <form className="MyDataTable" > 
   
<div className="MydataEnter">
  <input  className="px-2  form-control border-light display-3"
  onChange={(e)=>setSearch(e.target.value)}
  placeholder="Search Events"

  />
</div>
    </form>
      <div className="HomeLogin3 ">
      <div className="">
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          sortIcon={<SortIcon />}
          defaultSortAsc={true}
          pagination
          highlightOnHover
          dense
          theme="solarized" 
        />
     
    </div>
        {/* DeletePop */}
        <div className={hiddens}>
          <p>Do you Really Want to Delete this event </p>
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


export default ViewEvent;