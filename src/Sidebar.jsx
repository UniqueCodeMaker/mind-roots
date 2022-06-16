import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import "./react-sidenav.css";
import { useNavigate } from 'react-router-dom';
import "./App.css";
const SideNavbar = () => {
    const navigate = useNavigate();
    const Alogin = localStorage.getItem("Alogin")
    const Clogin = localStorage.getItem("Clogin")

return (
<>
{ (Alogin!=0 || Clogin!=0) ? 
  <div className="Sidebar">
  <SideNav
onSelect={(selected) => {
    navigate(selected)
}}
>
<SideNav.Toggle />
<SideNav.Nav defaultSelected="home">
  <NavItem eventKey="/home">
      <NavIcon>
          <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
      </NavIcon>
      <NavText>
          Home
      </NavText>
  </NavItem>
  <NavItem eventKey="Members">
      <NavIcon>
      <i className="fa fa-user-secret" aria-hidden="true"  style={{ fontSize: '1.75em' }}></i>
      </NavIcon>
      <NavText>
          Members
      </NavText>
      <NavItem eventKey="/applyform">
          <NavText>
            Add Members
          </NavText>
      </NavItem>
      <NavItem eventKey="/viewmember">
          <NavText>
              View Members
          </NavText>
      </NavItem>
  </NavItem>
  <NavItem eventKey="editevents">
      <NavIcon>
      <i className="fa fa-snowflake-o" aria-hidden="true" style={{ fontSize: '1.75em' }}></i>
      </NavIcon>
      <NavText>
          Events
      </NavText>
      <NavItem eventKey="/addevent">
          <NavText>
              Add Events
          </NavText>
      </NavItem>
      <NavItem eventKey="/editevent">
          <NavText>
              Edit Events
          </NavText>
      </NavItem>
      <NavItem eventKey="/viewevents">
          <NavText>
              View Events
          </NavText>
      </NavItem>
  </NavItem>

  <NavItem eventKey="sign">
      <NavIcon>
  <i className="fa fa-sign-in" aria-hidden="true" style={{ fontSize: '1.75em' }}></i>
      </NavIcon>
      <NavText>
          Profiles
      </NavText>
      <NavItem eventKey="/signin">
          <NavText>
              Sign In
          </NavText>
      </NavItem>
      <NavItem eventKey="/home">
          <NavText>
              Logout
          </NavText>
      </NavItem>
      <NavItem eventKey="/applyform">
          <NavText>
              Apply
          </NavText>
      </NavItem>
  </NavItem>
</SideNav.Nav>
</SideNav>
  </div>
:
<></>  
}
  </>
)



}


export default SideNavbar ; 