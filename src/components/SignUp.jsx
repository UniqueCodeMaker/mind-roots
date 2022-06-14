import React, { useState, useLayoutEffect , useRef } from "react";
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./NavBar"
import { Col, Row, FormFeedback } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classnames from 'classnames'

import SideNavbar from "../Sidebar";
const SignUp = () => {
	const navigate = useNavigate();
	const Role = localStorage.getItem('Role');
	const token = localStorage.getItem('token')
	

	const notifyA = () => toast("Welcome Client",
		{
			transition: Zoom
		});
	const notifyC = () => toast("Welcome Admin",
		{
			transition: Zoom
		});
	const notify = () => toast("Make sure to fill correct Details",
		{
			transition: Zoom
		});
		const noti = () => toast("You cant login untill you get approved by admin",
		{
			transition: Zoom
		});
	const notifyx = () => toast("You are Signing with wrong account",
		{
			transition: Zoom
		});

	const [Useremail, setUseremail] = useState("");
	const [Password, setPassword] = useState("");
	const [Check, setCheck] = useState(false);


	const handleChangeN = (e) => {
		setUseremail(e.target.value);

	}
	const handleChangeP = (e) => {
		setPassword(e.target.value);

	}

	useLayoutEffect(() => {
	
		if(Role==1 )
		{
			notifyC();
		}
		else if(Role==2)
		{
			notifyA();
		}
	}, []);



	const onSubmit = () => {

		// e.preventDefault();
		test2();
		test3();
		
		
			localStorage.setItem('Login' ,  Useremail)
		// notify()
	
	
	}

	const test2 = async() =>{
		await fetch(`http://localhost:5000/generateToken/${Useremail}/${Password}`, {
			crossDomain: true,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Useremail: Useremail,
				password: Password,
			})
		})
			.then(response => response.json())
			.then(responseJson => {
				localStorage.setItem('token', responseJson)
			}
			)
		}
		
		
		
		const test3 = async () => {
			
		await fetch(`http://localhost:5000/SignCheck/${Useremail}/${Password}/${Role}`)
		.then((response) => response.json())
		.then((actualData) => { 
			setCheck(true)
			if(actualData.length == 0 )
			{
				notifyx();	
			}
			else
			{
				if (Role == 1) {

					localStorage.setItem('Login', Useremail);
					navigate("/adminpanel")
			
				}
				else  {
					if (Role == 2)
				{	
					console.log(actualData[0].status == "applied" ,  "abc")
					if(actualData[0].status == "applied")	
					{	
						noti();
					
					}
					else
					{
							localStorage.setItem('Login', Useremail);
							navigate("/clientpanel")
					
					}

							
				}
				}
			}
			
		})


	}
	const form = useRef();
	const registerUser = yup.object().shape({
		Useremail: yup.string().min(2).required(),
		password: yup.string().min(2).max(16).required(),

	})
	const { register, formState: { errors }, handleSubmit , reset } = useForm({ mode: 'onChange', resolver: yupResolver(registerUser) })

	    

    const onError = (errors, e) => console.log("Hello");


	return (
		<>

			<NavBar />
			<SideNavbar/>
			<div className="HomeLogin ">

				<ToastContainer />
					<h1>Welcome to <span className="text-warning ">Mind-root Club </span></h1>
				<br/>
				<br/>
				<div className="coverBoth m-6">
		{/* <img src="" /> */}
				<div className="signup-form">
					<form action="#" method="GET" className="SignupPanel" ref={form}  onSubmit={handleSubmit(onSubmit, onError)}>
						<h2 className="CenterSi Feed">Sign In</h2>

						<hr />
						<div className="form-group">
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<span className="fa fa-user"></span>
									</span>
								</div>
								<input type="text" 
								  id="Useremail"
								  {...register('Useremail', { required: true })}
								  onChange={handleChangeN}
								  placeholder="Enter Email"
								  className={classnames('input  form-control Test', { 'is-invalid': errors && errors?.Useremail })}
							  />
							  {errors && errors?.Useremail && <FormFeedback>
								  <p className="Feed">Please type Valid Useremail</p></FormFeedback>}
							</div>
						</div>

						<div className="form-group">
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fa fa-lock"></i>
									</span>
								</div>
								<input type="password" 
								  id="inputPassword"
								  {...register('password', { required: true })}
								  onChange={handleChangeP}
								  placeholder="Enter Password"
								  className={classnames('input  form-control Test', { 'is-invalid': errors && errors?.password })}
							  />
							  {errors && errors?.password && <FormFeedback>
								  <p className="Feed">Please type Valid Password</p></FormFeedback>}
							</div>
						</div>

						<div className="form-group d-flex align-items-center flex-column">
							<label className="form-check-label  "><input type="checkbox" required="required" className="largerCheckbox pr-10" onClick={()=>notify()}/><span className="LargeText"> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></span></label>
						</div>
						<div className="form-group  ">
							<button type="submit" 
							className="btn d-flex mx-auto CustomCenter " 
							onClick={handleSubmit}>Sign In</button>
						</div>
					</form>
					{Role==2 ?
					<div className="text-center">Dont Have Account? <Link to="/Applyform"> Register </Link>  </div>
								:<></>}
				</div>
				</div>
			</div>
		</>

	)

}


export default SignUp;
