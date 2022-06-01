import React , { useState , useEffect } from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button,Container } from 'react-bootstrap';
import Logo from "../components/HomeScreen/images/Logo2.png";
import { useNavigate  , Link } from "react-router-dom";


const NavBar = () => {
  let navigate = useNavigate()
    const Title = <span className='HeaderLink'>Admin </span>;
    const Title2 = <span className='HeaderLink'>Client </span>;

   
    const Clogin = localStorage.getItem('Clogin')
    const Alogin = localStorage.getItem('Alogin')
    const Role = localStorage.getItem('Role')
    // console.log(" A " , Alogin ," C " ,  Clogin , " R " , Role )

    


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
          <Link to={"/ViewProfile"} ><center>View Profile</center></Link>
          <Link to={"/ViewEvents"}><center>View Events</center></Link>
          <Link to={ "/ClientPanel"}><center>Client Panel</center></Link>
          
        </NavDropdown>
        :
       (Alogin==1)?
       <NavDropdown  title={Title} id="collasible-nav-dropdown" >
          {/* <NavDropdown.Item href={ (Alogin==0)? "":"AddMember"} >Edit Member</NavDropdown.Item> */}
          <Link to={"/ViewProfile"} className="testDrop" ><center>View Profile</center></Link>
          <Link to={ "/ViewMember"}><center>View Member</center></Link>
          <Link to={ "/Applyform"}><center>Add Member</center></Link>
          <Link to={ "/AddEvent"}><center>Add Event</center></Link>
          <Link to={ "/ViewEvents"}><center>View Event</center></Link>
          <Link to={ "/Events"}><center>Edit Events</center></Link>
          <Link to={ "/AdminPanel"}><center>Admin Panel</center></Link>
        </NavDropdown>
      :
      <></> 
      }



    </Nav>
    <Link to="/About" ><span className="HeaderLink">About</span></Link>
    <Link to="/Home" ><span className=" user-dropdown-menu">Logout</span></Link>
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