import React, { useState , useEffect} from "react"
import "../../App.css";
import Logo from "./images/Logo2.png"

const Home = (props) => {
  
    const [Role, setRole] = useState(0);

    console.log(Role)

    localStorage.setItem('Role', Role)
    localStorage.setItem('Role', Role)
    localStorage.setItem('Clogin' , 0)
    localStorage.setItem('Alogin' , 0)

    return (
        <div className="HomeLogin">

            <div className="midPanel">
                {/* <span className="Logo">
                        <img src={Logo} alt="Logo"/>
                    </span> */}
                <h3 className="Row1">Login As</h3>
                <span className="Row2">
                <a href="SignUp"><button className="button-73" role="button" onClick={() => setRole(1)}>Admin</button></a>


                </span>
                <span className="Row3">
                <a href="SignUp"><button className="button-74" role="button" onClick={() => setRole(2)}>Client</button></a>
              

                </span>
                <h4 className="Apply" > <a href="Applyform"> <span className="changeLcolor">Apply | Register </span> </a></h4>
            </div>







        </div>
    )

}

export default Home
