import React, { useState, useEffect } from "react"
import "../../App.css";
import NavBar from ".././NavBar"
import { useNavigate, Link } from "react-router-dom";
const Home = (props) => {

    const [Role, setRole] = useState(0);
    const history = useNavigate();

    localStorage.setItem('Role', 0)
    localStorage.setItem('Clogin', 0)
    localStorage.setItem('Alogin', 0)
    localStorage.setItem('token', 0)

    useEffect(() => {
        if (Role !== 0) {
            localStorage.setItem('Role', Role);
            history("/SignUp")
        }
    }, [Role])

    return (
        <> <NavBar />
            <div className="HomeLogin">

                <div className="midPanel">

                    <h3 className="Row1">Login As</h3>
                    <span className="Row2">
                        <button onClick={() => setRole(1)} className="button-73" role="button" >Admin</button>


                    </span>
                    <span className="Row3">
                        <button onClick={() => setRole(2)} className="button-74" role="button">Client</button>


                    </span>
                    <h4 className="Apply" > <Link to="/Applyform"> <span className="changeLcolor">Apply | Register </span> </Link></h4>
                </div>







            </div>
        </>
    )

}

export default Home
