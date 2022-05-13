import React , { useState } from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button,Container } from 'react-bootstrap';
import Logo from "../components/HomeScreen/images/Logo2.png";
const NavBar = () => {

    const Title = <span className='HeaderLink'>Admin </span>;
    const Title2 = <span className='HeaderLink'>Client </span>;

    const Role = localStorage.getItem('Role')
  console.log(Role)
    
    const [SearchValue , setSearchValue] = useState();
 

        const test2 =  ()=>
        {
   
          localStorage.setItem('search', SearchValue)

          window.open("ViewEvents","_self")
        }
  


        // console.table(Check);


return (
<Navbar  expand="md" className="Navbar" sticky="top" >
  <Container fluid >
    <Navbar.Brand href="#"><img src={Logo} className="LogoUp" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll"  />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="HeaderItems"
        
        navbarScroll
      >
        <Nav.Link href="Home" ><span className="HeaderLink">Home</span></Nav.Link>
       {  (Role==2)? 
        <NavDropdown  title={Title2} id="navbarScrollingDropdown" >
          <NavDropdown.Item href="ViewProfile" >View Profile</NavDropdown.Item>
          <NavDropdown.Item href="ViewEvents">View Events</NavDropdown.Item>
          <NavDropdown.Item href="ClientPanel">Client Panel</NavDropdown.Item>
          
        </NavDropdown>
        :  
       (Role==1)?
        <NavDropdown  title={Title} id="navbarScrollingDropdown" >
          <NavDropdown.Item href="AddMember" >Add Member</NavDropdown.Item>
          <NavDropdown.Item href="ViewMember">View Member</NavDropdown.Item>
          <NavDropdown.Item href="AddEvent">Add Event</NavDropdown.Item>
          <NavDropdown.Item href="ViewEvents">View Event</NavDropdown.Item>
          <NavDropdown.Item href="AdminPanel">Admin Panel</NavDropdown.Item>
        </NavDropdown>
      :
      <></> 
      }
       <Nav.Link href="/"  >
        <span className="HeaderLink" >SignOut</span>
        </Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"

          onChange={(e)=> setSearchValue(e.target.value)}
      
      
      />
        &nbsp;
        &nbsp;
      
        <Button variant="btn btn-primary"
          onClick={test2}
        >Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        
    )




}

export default NavBar;