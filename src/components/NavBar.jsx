import React , { useState , useEffect } from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button,Container } from 'react-bootstrap';
import Logo from "../components/HomeScreen/images/Logo2.png";
const NavBar = () => {

    const Title = <span className='HeaderLink'>Admin </span>;
    const Title2 = <span className='HeaderLink'>Client </span>;

    const Role = localStorage.getItem('Role')
    const Clogin = localStorage.getItem('Clogin')
    const Alogin = localStorage.getItem('Alogin')
    console.log("C" , Clogin ,"A" ,  Alogin , "R", Role)
    
    const [SearchValue , setSearchValue] = useState();
 


        const test2 =  ()=>
        {
   
          localStorage.setItem('search', SearchValue)

          window.open("ViewEvents","_self")
        }
  
        // useEffect(() => {
        //   Navbar();
        //   }, []);
          


        // console.table(Check);


return (
  <>
  <div className="navBar">
      <Navbar  expand="md" className="m-auto" sticky="top" >
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
          <NavDropdown.Item href={(Clogin==0)?"":"ViewProfile"} >View Profile</NavDropdown.Item>
          <NavDropdown.Item href={(Clogin==0)?"":"ViewEvents"}>View Events</NavDropdown.Item>
          <NavDropdown.Item href={ (Clogin==0)? "":"ClientPanel"}>Client Panel</NavDropdown.Item>
          
        </NavDropdown>
        :  
       (Role==1)?
        <NavDropdown  title={Title} id="navbarScrollingDropdown" >
          <NavDropdown.Item href={ (Alogin==0)? "":"AddMember"} >Edit Members</NavDropdown.Item>
          <NavDropdown.Item href={ (Alogin==0) ? "":"ViewMember"}>View Member</NavDropdown.Item>
          <NavDropdown.Item href={ (Alogin==0)? "":"AddEvent"}>Add Event</NavDropdown.Item>
          <NavDropdown.Item href={ (Alogin==0)? "":"ViewEvents"}>View Event</NavDropdown.Item>
          <NavDropdown.Item href={ (Alogin==0)? "":"AdminPanel"}>Admin Panel</NavDropdown.Item>
        </NavDropdown>
      :
      <></> 
      }
    {  (Clogin==1 || Alogin==1 )?   
      <Nav.Link href="/"  >
        <span className="HeaderLink" >SignOut</span>
        </Nav.Link>
    :<></> 
     } </Nav>
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
</div>

  </>

        
    )




}

export default NavBar;