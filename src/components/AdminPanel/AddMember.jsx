import React, { useState,useLayoutEffect } from 'react';
import "../../App.css";
import moment from "moment";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classnames from 'classnames'
import { Col, Row, FormFeedback } from 'reactstrap'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import NavBar from '../NavBar';
import {  Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
  import SideNavbar from "../../Sidebar"
// import moment from "moment"
const intialVal = {
    "id": "",
    "name": "",
    "email": "",
    "mobile": "",
    "dob": "",
    "gender": "",
    "password": "",
    "transaction": ""
};


const AddMember = () => {
    localStorage.setItem("UserDetails" , JSON.stringify( intialVal ));
    
    const [details, setDetails] = useState(intialVal);
    
   useLayoutEffect(() => {
        test2();
         
        setChangeD("text")
        const UserSelected  = localStorage.getItem("userSelect")
        // UserSelected
    
        fetch(`http://localhost:5000/UserSelected/${UserSelected}`)
        .then((response) => response.json())
        .then((actualData) => setDetails(...actualData))
       
        
    
    }, []);

  
    
    const START = 100;
    const END = 5000;
    const form = useRef();
    const num = Math.floor(Math.random() * (START - END + 1)) + END;

    // function GenerateId(e) {
    //     e.preventDefault();
    //     setGenerate(num);

    // }


  
    const notify = () => toast("User Updated successfully", 
	{
	  transition: Zoom
	});

    const [user, setUser] = useState([])
    
    const [Generate, setGenerate] = useState("Generate Transaction Id")

    const registerUser = yup.object().shape({
        // name: yup.string().min(3),
        // password: yup.string().min(4).max(16),
        // email: yup.string().email(),
        // dob: yup.date(),
        // mobile: yup.number(),
        // gender: yup.string(),
    })
    const { register ,formState: { errors }, handleSubmit, watch, reset } = useForm({ mode: 'onChange', resolver: yupResolver(registerUser) })

    const onSubmit = async (data , e ) => {
    
        details.dob = moment(details.dob).format('YYYY-MM-DD')
        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type':  "application/json",
                'Accept':  'application/json'
            },
            body: JSON.stringify(details),
        };
        const res = await fetch('http://localhost:5000/Edit', requestOptions)
        
        notify();
        // reset();
        setChangeD("date")
        // setDetails("")
        emailjs.sendForm('Mygmail1304', 'Mytemp1304', e.target , 'qY4WZ3P78KAZ_aTap')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }



    const onError = (errors, e) => console.log(errors, e);

    const [Check, setCheck] = useState([{}]);
    

// console.log(Check);

    const test2 = async () => {
        await fetch(`http://localhost:5000/`)
            .then((response) => response.json())
            .then((actualData) => setCheck(actualData)
            
            )
    }
    const [ChangeD, setChangeD] = useState("date");
    
    const handleChange = (e) => {
        setDetails({
        ...details,
        [e.target.name] : e.target.value
        })
    }
    
    return (
        <>
        <NavBar/>
        <SideNavbar/>
      <div className="ApplyForm">
      <ToastContainer />
            <div className="FormPanel d-flex justify-content-center BackTrans">
             
                <form className=" form-control mb-3 row  AddEventF" ref={form} onSubmit={handleSubmit(onSubmit, onError )}>
                    <h3 className="titleForm">Edit Record</h3>
                    <div className="form-infor-profile">
                        <div className="info-account">
                            
                                {/* <Col sm={12}>
                                    <select
                                        name="User"
                                        id="User"
                                        {...register('User', {
                                            onChange: async () => {
                                                await fetch(`http://localhost:5000/test/${watch('User')}`)
                                                    .then((res) => res.json())
                                                    .then((Data) => {
                                                        setDetails(...Data);
                                                       
                                                        setChangeD("text")
                                                        setUser(Data)
                                                    }
                                                    )

                                            }
                                        })}
                                        className="SelectUser form-control hidden"

                                    >
                                        {/* <option value="Select Users" hidden selected>Select Users</option> */}
                                        {/* {Check.map((checks) => <option value={checks.name}  >{checks.name}</option>)
                                        
                                        } */}
                                    {/* </select>
                                </Col> */} 

                                <Col sm={12}>
                                    <label className="label label-primary ">Name</label>
                                    <input
                                        id="name"
                                        defaultValue={details.name}
                                        {...register('name', { required: true })}
                                        type="text"
                                        placeholder="Enter Name"
                                    //    value={details.name}
                                       onChange={handleChange}
                                        className={classnames('input form-control', { 'is-invalid': errors && errors?.name })}
                                        
                                    />
                                    {errors && errors?.name && <FormFeedback>Please type  Name</FormFeedback>}
                                </Col>
                                <Col sm={12}>
                                    <label className="label label-primary">Email</label>
                                    <input
                                        id="email"
                                        defaultValue={details.email}
                                        {...register('email', { required: true })}
                                        type="email"
                                        onChange={handleChange}

                                        placeholder="Enter Email"
                                        className={classnames('input form-control', { 'is-invalid': errors && errors?.email })}
                                    />
                                    {errors && errors?.email && <FormFeedback>Please type Email</FormFeedback>}
                                </Col>

                            
                        </div>
                        <div className="info-social">
                           
                                <Col sm={12}>
                                    <label className="label label-primary">Password</label>
                                    <input
                                        // id="password"
                                        id="inputPassword"
                                        defaultValue={details.password}
                                        {...register('password', { required: true })}
                                        type="text"
                                        placeholder="Enter Password"
                                        onChange={handleChange}
                                        className={classnames('input  form-control', { 'is-invalid': errors && errors?.password })}
                                    />
                                    {errors && errors?.password && <FormFeedback>Please type Password</FormFeedback>}
                                </Col>
                                <Col sm={12}>
                                    <label className="label label-primary">Mobile</label>
                                    <input
                                        id="mobile"
                                        {...register('mobile', { required: true })}
                                        type="text"
                                        placeholder="Enter Mobile No."
                                        onChange={handleChange}
                                        className={classnames('input  form-control', { 'is-invalid': errors && errors?.mobile })}
                                        defaultValue={details.mobile}
                                    />
                                    {errors && errors?.mobile && <FormFeedback>Please type Mobile No.</FormFeedback>}
                                </Col>

                                <Col sm={12}>
                                    <div className="form-group  md-form ">
                                        <label className="label label-primary ">Date Of Birth</label>
                                        <input
                                            id="dob"
                                            defaultValue={moment(details.dob).format('YYYY-MM-DD')}               
                                            onChange={handleChange}
                                            name="dob"
                                            type={ChangeD}
                                            // id='datetimepicker1'
                                            placeholder="Date of Birth"
                                            {...register('dob', { required: true })}
                                            className={classnames('input-group date form-group form-control', { 'is-invalid': errors && errors?.dob })}
                                        />

                                    </div>
                                    {errors && errors?.dob && <FormFeedback>Please enter date of birth</FormFeedback>}
                                </Col>
                                <Col sm={12}>  <label className="label label-primary ">Gender</label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        onChange={handleChange}
                                        {...register('gender', { required: true })}
                                        defaultValue={details.gender}
                                        className={classnames('form-control', { 'is-invalid': errors && errors?.gender})}
                                    >
                                        <option value="null" disabled selected>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors && errors?.gender && <FormFeedback>Please select Gender</FormFeedback>}

                                </Col>

                       
                            <br />

                        </div>
                    </div>
                    <input className="form-control"
                        type="text"
                       
                        name="transaction"
                        id="transaction"
                        {...register('transaction', { required: true })}
                        placeholder="Transaction Id"
                        defaultValue={details.transaction}
                        onChange={handleChange}
                    />
                    <br />
                    <button className=" form-control font-weight-bold tn btn btn-outline-dark  " type="submit">
                        Edit
                    </button>
                    <br/>
                    <br/>
                    <br/>
                    <Link to="/viewmember" 
                    
                   
                    className=" font-weight-bold tn btn-outline-primary form-control text-center"
                    
                    > {`>`}</Link>
                </form>
           
            </div>







        </div>

        </>

        )

}

export default AddMember
