import React , { useState , useEffect } from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button,Container } from 'react-bootstrap';
import Logo from "../components/HomeScreen/images/Logo2.png";
import { useNavigate  , Link } from "react-router-dom";


const NavBar = () => {





  let navigate = useNavigate()
    const Title = <span className='HeaderLink'>Admin </span>;
    const Title2 = <span className='HeaderLink'>Client </span>;
    const Title3 = <span className='HeaderLink'>Profile </span>;

   
    const Clogin = localStorage.getItem('Clogin')
    const Alogin = localStorage.getItem('Alogin')
    const Role = localStorage.getItem('Role')
  















    


return (
  <>
  <div className="" >
      <Navbar  expand="lg" className="mx-auto ownDark navbar-light" sticky="top"  >
  <Container fluid >
    <Navbar.Brand href="#" className="text-warning ">Mind-root Club</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll"  />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="HeaderItems"
         
        navbarScroll
      >
        
       {  (Clogin==1)? 
        <NavDropdown  title={Title2} id="collasible-nav-dropdown" >
          <Link to={"/viewprofile"} ><center>View Profile</center></Link>
          <Link to={"/viewevents"}><center>View Events</center></Link>
          <Link to={ "/clientpanel"}><center>Client Panel</center></Link>
          
        </NavDropdown>
        :
       (Alogin==1)?
       <NavDropdown  title={Title} id="collasible-nav-dropdown" >
          {/* <NavDropdown.Item href={ (Alogin==0)? "":"AddMember"} >Edit Member</NavDropdown.Item> */}
          <Link to={"/viewprofile"} className="testDrop" ><center>View Profile</center></Link>
          <Link to={ "/viewmember"}><center>View Member</center></Link>
          <Link to={ "/applyform"}><center>Add Member</center></Link>
          <Link to={ "/editevent"}><center>Add Event</center></Link>
          <Link to={ "/viewevents"}><center>View Event</center></Link>
          <Link to={ "/editevent"}><center>Edit Events</center></Link>
          <Link to={ "/adminpanel"}><center>Admin Panel</center></Link>
        </NavDropdown>
      :
      <></> 
      }


<div className="CProfilePic2">
                        <img src="data:image/jpeg;base64,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" alt="Profile Pic" className="ImageClient2"/>
                    </div>
      <p className="AdminName">RUDRAX</p>
      <p className="AdminRole">Admin</p>

    <NavDropdown  title={Title3} id="collasible-nav-dropdown" >
    <Link to="/about" ><span className=""><center>About</center></span></Link>
    <Link to="/home" ><span className=""><center>Logout</center></span></Link>
    </NavDropdown>
    </Nav>
    </Navbar.Collapse>
     
  </Container>
</Navbar>
{ (Alogin==1)?
<div className="BreadCenter">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><Link to="/ViewProfile">View Profile</Link></li> 
    <li class="breadcrumb-item"><Link to="/ViewEvents">View Events</Link></li>
    <li class="breadcrumb-item"><Link to="/AddEvent">Add Event</Link></li>
    <li class="breadcrumb-item"><Link to="/ViewMember">View Members</Link></li>
   
  </ol>
</nav>

</div>
:(Clogin==1)?
<div className="BreadCenter">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><Link to="/ViewProfile">View Profile</Link></li> 
    <li class="breadcrumb-item"><Link to="/ViewEvents">View Events</Link></li>

   
  </ol>
</nav>

</div>
:
<></>
}
</div>

  </>

        
    )




}

export default NavBar;