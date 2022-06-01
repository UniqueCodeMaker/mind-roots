import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import "./react-sidenav.css";
import { useNavigate } from 'react-router-dom';
import "./App.css";
const SideNavbar = () => {
    const navigate = useNavigate();
return (

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
  <NavItem eventKey="charts">
      <NavIcon>
      <i class="fa fa-user-secret" aria-hidden="true"  style={{ fontSize: '1.75em' }}></i>
      </NavIcon>
      <NavText>
          Members
      </NavText>
      <NavItem eventKey="charts/linechart">
          <NavText>
            Add Members
          </NavText>
      </NavItem>
      <NavItem eventKey="charts/barchart">
          <NavText>
              View Members
          </NavText>
      </NavItem>
  </NavItem>
  <NavItem eventKey="test">
      <NavIcon>
      <i class="fa fa-snowflake-o" aria-hidden="true" style={{ fontSize: '1.75em' }}></i>
      </NavIcon>
      <NavText>
          Events
      </NavText>
      <NavItem eventKey="charts/linechart">
          <NavText>
              Add Events
          </NavText>
      </NavItem>
      <NavItem eventKey="charts/barchart">
          <NavText>
              Edit Events
          </NavText>
      </NavItem>
  </NavItem>

  <NavItem eventKey="Sign">
      <NavIcon>
  <i class="fa fa-sign-in" aria-hidden="true" style={{ fontSize: '1.75em' }}></i>
      </NavIcon>
      <NavText>
          Profiles
      </NavText>
      <NavItem eventKey="charts/linechart">
          <NavText>
              Sign In
          </NavText>
      </NavItem>
      <NavItem eventKey="charts/barchart">
          <NavText>
              Logout
          </NavText>
      </NavItem>
      <NavItem eventKey="/Applyform">
          <NavText>
              Apply
          </NavText>
      </NavItem>
  </NavItem>
</SideNav.Nav>
</SideNav>
  </div>
)



}


export default SideNavbar ; 