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
import { Badge } from "reactstrap"
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
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  }
  
});



const ViewMember = () => {


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


    localStorage.setItem("userSelect", i);
    navigate("/editmember");

  }
const Login  =  localStorage.getItem("Login")
  var HandleDelete = async function (i) {
    let array = data.filter(curr=>{
      return curr.id==i
    })
    // console.log(i)
    sethiddens("DeletePop")
    setDoneD(i);  

  }

// console.log(data);



  
  const DeletedUsers = () => {
      console.log(DoneD , "i")  
      if(DoneD!=0){
      fetch(`http://localhost:5000/Delete/${DoneD}`, { mode: 'cors' })
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
    await fetch('http://localhost:5000')
    .then(response => response.json())
    .then((text)=>{setMembers(text)
      console.log(text)
    })
    .catch((error)=>{console.log(error)})
    .finally(() => {console.log('done')})
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
  userdata();
}

  }, [Search])


  
const style2 = { 
  color:"yellow",
  fontSize:"15px",
  padding:"10px",
  margin:"3px",
  
}
const style1 = { 
  color:"aqua",
  fontSize:"14px",
  padding:"10px",
  margin:"3px",
  
}
const style3 = { 
  color:"lime",
  fontSize:"14px",
  padding:"10px",
  margin:"3px",
}

  const [data , setMembers] = useState([{
  }]);
  
  useEffect(() => {
     
      userdata();
      

    }, []);
     const columns = [
    
     
      {
          name: "Id",
          
          sortable: false,
          width: "4rem",
          cell: (row, index) => index+1    
        },
        {
          name: "Email",
          selector: (row)=>row.email,
          sortable: true ,
          width: "14rem"    
          
        },
        {
          name: "Mobile",
          selector: (row)=>row.mobile,
          sortable: true
          ,width: "10rem"
        },
        {
          name: "DOB",
          selector: (row)=>row.dob,
          sortable: true,
          width: "10rem",
          },
        {
          name: "Gender",
          selector: (row)=>row.gender,
          sortable: true,
          width: "6rem"
        
        },
   
        {
          name: "Transaction",
          selector: (row)=>row.transaction,
          sortable: true,
          width: "8rem"
        },
        {
          name: "Status",
     
          sortable: true,
          cell: (row) => {
            return (
              <Badge 
                bg="danger"
              style={row.status=="Applied"?style2:row.status=="Admin"?style1:style3} pill>
                {(row.status) }
              </Badge>
            )
          }
        },
      {
        name: "Action",
        sortable: false,
        selector: (row)=>{},
        width: "10rem",
        cell: (row , index) => (
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
  return (
    <>
      <NavBar />
      <SideNavbar/>
      <form className="MyDataTable" > 
   
<div className="MydataEnter">
  <input  className="px-2  form-control border-light display-3"
  onChange={(e)=>setSearch(e.target.value)}
  placeholder="Search Members"

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