import React, { useState, useLayoutEffect, useEffect } from "react"
import "../../App.css";
import NavBar from ".././NavBar"
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
// import Background from "./images/HomeBack2.jpg"
import Background from "./images/HomeF.jpg"
import SideNavbar from "../../Sidebar";

const Home = (props) => {

    const Alogin = localStorage.getItem("Alogin")
    const Clogin = localStorage.getItem("Clogin")
    const notify = () => toast("Logout Successfully",
        {
            transition: Zoom
        });
    useEffect(() => {
        if (Alogin == 1 || Clogin == 1) {
            notify();
        }
    }, [])

    const [Role, setRole] = useState(0);
    const history = useNavigate();

    localStorage.setItem('Role', 0)
    localStorage.setItem('Clogin', 0)
    localStorage.setItem('Alogin', 0)
    localStorage.setItem('Login', 0)
    localStorage.setItem('token', 0)
    localStorage.setItem('Login', 0)

    useLayoutEffect(() => {
        if (Role !== 0) {
            localStorage.setItem('Role', Role);

            history("/signin")
        }
    }, [Role])



    return (
        <>

            <NavBar />
            <SideNavbar />
            <ToastContainer />

            <div className="HomeLogin">

                <div className="coverBoth m-6">
                    <div className="DetailsAbout">
                        <img src={Background} alt="imgae" className="signup-form backIMg  OwnBack" />

                    </div>
                    <div className="ControlUi">
                        <div className="midPanel signup-form">

                            <h4 className="Row1  Feed ">Login As</h4>
                            <hr />
                            <span className="Midrow">
                                <span className="Row2">
                                    <button onClick={() => setRole(1)} className="button-73" role="button" >Admin</button>


                                </span>
                                <span className="Row3">
                                    <button onClick={() => setRole(2)} className="button-74" role="button">Client</button>


                                </span>
                            </span>
                            <h4 className="Apply" > <Link to="/applyform"> <span className="changeLcolor Feed">Apply</span> </Link></h4>
                        </div>
                        <div className="  midPanel TextAbout ">

                            This is Demo Project <br />based on Club Events
                        </div>
                    </div>


                </div>






            </div>
        </>
    )

}

export default Home
