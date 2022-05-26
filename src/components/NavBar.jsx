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
    console.log(" A " , Alogin ," C " ,  Clogin , " R " , Role )

    
    const [SearchValue , setSearchValue] = useState();
 


        const test2 =  ()=>
        {
   
          localStorage.setItem('search', SearchValue)

          navigate(`/ViewEvents`);
        }
  
      

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
        <Link to="/Home" ><span className="HeaderLink">Home</span></Link>
       {  (Clogin==1)? 
        <NavDropdown  title={Title2} id="navbarScrollingDropdown" >
          <Link to={"/ViewProfile"} ><center>View Profile</center></Link>
          <Link to={"/ViewEvents"}><center>View Events</center></Link>
          <Link to={ "/ClientPanel"}><center>Client Panel</center></Link>
          
        </NavDropdown>
        :
       (Alogin==1)?
       <NavDropdown  title={Title} id="navbarScrollingDropdown" >
          {/* <NavDropdown.Item href={ (Alogin==0)? "":"AddMember"} >Edit Member</NavDropdown.Item> */}
          <Link to={"/ViewProfile"} ><center>View Profile</center></Link>
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
        { (Clogin==1 || Alogin==1 )?
        
        <Button variant="btn btn-primary"        
        onClick={test2}>Search</Button>
        :
        <></>
}
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>

  </>

        
    )




}

export default NavBar;