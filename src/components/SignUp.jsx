import React,{ useState , useEffect } from "react";
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
  import NavBar from "./NavBar"
const SignUp = () => {
	
const Role = localStorage.getItem('Role');
	const notifyA = () => toast("Welcome Client", 
	{
	  transition: Zoom
	});
	const notifyC = () => toast("Welcome Admin", 
	{
	  transition: Zoom
	});
	const notify = () => toast("Please Type correct details or register yourself", 
	{
	  transition: Zoom
	});

	const [Username,setUsername] = useState("");
	const [Password,setPassword] = useState("");
	const [Check,setCheck ] = useState(false); 


	const handleChangeN=(e) =>{
		setUsername(e.target.value);
		
	  }
	  const handleChangeP=(e) =>{
		setPassword(e.target.value);
		
	  }

	  useEffect(() => {
		(Role == 1) ? notifyC() : notifyA()
	
	  }, []);
	  
		
	
	  const handleSubmit=(e)=> {
		
		e.preventDefault();
		test3();
		setTimeout(() => notify(), 500);
		
	}

	if(Check == true && Role == 1 )
	{
		
		notifyC();
		
		window.open("http://localhost:3000/AdminPanel","_self",false);
		localStorage.setItem('Login' , Username );
	}
	if(Check == true && Role == 2 )
	{
		
		notifyA();
		window.open("http://localhost:3000/ClientPanel","_self",false);
		localStorage.setItem('Login' , Username );
	}	
	
		const test3 = async ()=>
		{
			
		await fetch(`http://localhost:5000/SignCheck/${Username}/${Password}`)
		.then((response) => response.json())
		.then((actualData) => {actualData ? setCheck(true):setCheck(false)
			
		})

	}
	
	// console.log(Check , Role)	
    return(
 <>
 <NavBar/>
        <div className="HomeLogin">
			<ToastContainer />
            <div className="signup-form">
    <form action="#" method="GET" className="SignupPanel">
		<h2 className="CenterSi">Sign In</h2>
	
		<hr/>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<span className="fa fa-user"></span>
					</span>                    
				</div>
				<input type="text" className="form-control Test" name="username" placeholder="Username" required="required" onChange={handleChangeN}/>
			</div>
        </div>
        
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-lock"></i>
					</span>                    
				</div>
				<input type="password" className="form-control Test" name="password" placeholder="Password" required="required"  onChange={handleChangeP}/>
			</div>
        </div>
		
        <div className="form-group">
			<label className="form-check-label"><input type="checkbox" required="required" className="largerCheckbox"/><span className="LargeText"> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></span></label>
		</div>
		<div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Sign In</button>
        </div>
    </form>
	<div className="text-center">Dont Have Account? <a href="Applyform"> Register </a>  </div>
</div>
        </div>
 </>
 
    )

}


export default SignUp;