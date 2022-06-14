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
          <Link to={ "/editevents"}><center>Edit Events</center></Link>
          <Link to={ "/adminpanel"}><center>Admin Panel</center></Link>
        </NavDropdown>
      :
      <></> 
      }




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