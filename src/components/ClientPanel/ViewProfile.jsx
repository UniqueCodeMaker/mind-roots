import React,{ useState ,useLayoutEffect } from "react"
import "../../App.css";
import CProfilePic from "../HomeScreen/images/ClientPic2.webp"
import { FaMobileAlt } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { HiOutlineMail } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";

import { BsGenderAmbiguous   } from "react-icons/bs";
import { MdOutlinePassword } from "react-icons/md";
import webImg from "../HomeScreen/images/ClientPic2.webp"
import NavBar from "../NavBar";
import moment from 'moment';
import SideNavbar from "../../Sidebar"
const ViewProfile = () => {
    const [Check,setCheck ] = useState([{}]); 
  
    const TLogin = localStorage.getItem('Login');
   
    const style = { color: "white",
     fontSize: "2.5em",
    
     padding:"8px",
     borderRadius:"5px",    

     }

               useLayoutEffect(() => {
                 
                    test2();
                    
                }, []);
                    const test2 = async ()=>
                    {
                await fetch(`http://localhost:5000/loggedin/${TLogin}`)
                    .then((response) => response.json())
                    .then((actualData) => setCheck(actualData))
                }
              
   
    return( 
       <>
        <NavBar/>
            <SideNavbar/>
        <div className="HomeLogin">
            
       <div className="DesignPanel">
                <div className="CProfileView">
                <h2 className="CProfileName">{(Check[0].name)? Check[0].name : "abc" }</h2>
                <h5 className="CProfileEmail">{(Check[0].email) ? Check[0].email : "abc"}</h5>

                    <div className="CProfilePic">
                        <img src={(Check[0].ImageUrl)? (Check[0].ImageUrl) : webImg} alt="Profile Pic" className="ImageClient"/>
                    </div>
                    <hr className="midLine"/>
                   <div className="IconsDetails">
                       <div className="CoverAll">
                       <div className="IconsView">
                       <FaRegUserCircle style={style}/>
                       <span className="tooltiptext">Name</span>
                       </div>
                       <div className="DetailView">
                       {(Check[0].name )? Check[0].name : "abc"}
                       </div>
                       </div>
                       <div className="CoverAll">
                       <div className="IconsView">
                       <HiOutlineMail style={style}/>
                       <span className="tooltiptext">Email</span>
                       </div>
                       <div className="DetailView">
                       {(Check[0].email) ? Check[0].email : "abc"}
                       </div>
                       </div>
                       <div className="CoverAll">
                       <div className="IconsView">
                       <FaMobileAlt style={style}/>
                       <span className="tooltiptext">Mobile No.</span>
                       </div>
                       <div className="DetailView">
                       {(Check[0].mobile)? Check[0].mobile : "abc"}
                       </div>
                       </div>
                       <div className="CoverAll">
                       <div className="IconsView">
                       <BsCalendarDate style={style}/>
                       <span className="tooltiptext">Date of Birth</span>
                       </div>
                       <div className="DetailView">
                     {moment(Check[0]?.dob).format('YYYY-MM-DD')}
                       </div>
                       </div>
                       <div className="CoverAll">
                       <div className="IconsView">
                       <BsGenderAmbiguous style={style}/>
                       <span className="tooltiptext">Gender</span>
                       </div>
                       <div className="DetailView">
                       {Check[0].gender? Check[0].gender :"abc"}
                       </div>
                       </div>
                       
                       <div className="CoverAll">
                       <div className="IconsView">
                       <FaMoneyCheckAlt style={style}/>
                       <span className="tooltiptext">Transacton Id</span>
                       </div>
                       <div className="DetailView">
                       {(Check[0].transaction? Check[0].transaction : "abc")}
                       </div>
                       </div>
                   </div>
                </div>
           </div> 
    </div>
       </>
      
        )
}

export default ViewProfile;