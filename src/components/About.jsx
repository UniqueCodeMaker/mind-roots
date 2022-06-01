import BackAbout from "./HomeScreen/images/BackAbout.jpg"
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar"
import SideNavbar from "../Sidebar";
const About  =  () => {

    return (

        <>
        <NavBar/>
<SideNavbar/>
        <div className="container-fluid Imagesback">
            {/* <img src={BackAbout} alt="" /> */}
            {/* <Link to="/ViewMember" style={{display: "inline" , marginLeft: "150px" , color:"white" , fontSize:"30px"}}></Link> */}
        {/* <h1 className="text-warning">Our Work Philosophy</h1>        
        <p>
            Mind Roots is a software design and development company which provides globally focused IT solutions. Our ability is to go beyond developing programs and actually come out with products which are easy to use and scale. We are great at defining product features and designing user interfaces. We are also highly capable of producing great technical documentation to help internal or external customers. Being a value based enterprise web solutions and consulting company, Mind Roots strongly believes in promoting best practices, innovation and corporate social responsibility.  
        </p>

        <h1 className="text-warning">Vision</h1>
        <p >Our vision is to become an IT giant and work to provide end-to-end solutions across various verticals that help businesses to improve productivity and work smartly.
        </p>

        <h1 className="text-warning ">Mission</h1>
        <p>Our mission is to SIMPLIFY SOFTWARE DEVELOPMENT. We work deeply with our clients to convert their business needs into efficient products.
        </p> */}
        </div>
        <iframe src="https://www.mind-roots.com/portfolios/" className="portfolios"></iframe>

        
</>
    )

}

export default About