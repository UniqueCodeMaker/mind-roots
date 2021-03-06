import React, { useState, useEffect } from 'react';
import "../../App.css";
import { useNavigate  , Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classnames from 'classnames'
import { Col, Row, FormFeedback } from 'reactstrap'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import ImageUpload from "../ImageUpload.jsx"
// import ImageUploading from "react-images-uploading";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import NavBar from "../NavBar"
import SideNavbar from "../../Sidebar"
const Applyform = () => {
    let navigate = useNavigate()
    const START = 100;
    const END = 5000;
    const form = useRef();
    const num = Math.floor(Math.random() * (START - END + 1)) + END;

    function GenerateId(e) {
        e.preventDefault();
        setGenerate(num);

    }


    const notify = () => toast("You have successfully applied wait for login till Admin approve you",
        {
            transition: Zoom
        });

    const [Username, setUsername] = useState("");
	const [Password, setPassword] = useState("");
    const [user, setUser] = useState()

	const handleChangeN = (e) => {
		setUsername(e.target.value);

	}
	const handleChangeP = (e) => {
		setPassword(e.target.value);

	}
    const [Generate, setGenerate] = useState("Generate Transaction Id")

        const test2 = () => {
        
            fetch(`http://localhost:5000/generateToken/${Username}/${Password}`, {
        crossDomain:true,
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          username: Username,
          password: Password,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          localStorage.setItem('token', responseJson)
          
        }
          )
        }



    const registerUser = yup.object().shape({
        name: yup.string().min(3).required(),
        password: yup.string().min(4).max(16).required(),
        email: yup.string().email().required(),
        dob: yup.date().required(),
        mobile: yup.number().required(),
        gender: yup.string().required(),
        transaction: yup.string().required(),

    })
    const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange', resolver: yupResolver(registerUser) })
    const onSubmit = async (data, e) => {
        data.ImageUrl = localStorage.getItem('ImageUrl');
        data.Role = 2
        data.dob = moment(data.dob).format('YYYY-MM-DD')
        test2();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        };
        
        await fetch('http://localhost:5000/apply', requestOptions)
        .then(response => response.json())
        .then((text)=>{console.log(text)})
        .catch((error)=>{console.log(error)})
        .finally(() => {console.log('done')})
       
        reset();
        setGenerate("Generate Transaction Id")
        document.getElementsByClassName("ImageUpload")[0].getElementsByTagName('img')[1].src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png"    
        localStorage.setItem('Login' ,  data.email) 
       
        notify();
        
       
        await fetch('http://localhost:5000/sendmail', requestOptions)
        .then(response => response.json())
        .then((text)=>{console.log(text)})
        .catch((error)=>{console.log(error)})
        .finally(() => {console.log('done')})
      
    }
    

    const onError = (errors, e) => console.log(errors, e);
    
    
    
    
    return (
        <>
            <NavBar />
            <SideNavbar/>
            <div className="ApplyForm ">
                <ToastContainer />
                <div className="FormPanel d-flex justify-content-center BackTrans ">
                  
                    <form className="mb-3 row AddEventF" ref={form} onSubmit={handleSubmit(onSubmit, onError )}>
                        <h3 className="d-flex justify-content-center">Join MRT Club</h3>
                        <div className="form-infor-profile">
                            <div className="info-account">

                                <ImageUpload id="sample"/>
                                <Col sm={12}>
                                    <label className="label text-light ">Name</label>
                                    <input
                                        id="name"
                                        defaultValue={user?.name}
                                        {...register('name', { required: true })}
                                        type="text"
                                        onChange={handleChangeN}
                                        placeholder="Enter Name"
                                        className={classnames('input form-control', { 'is-invalid': errors && errors?.name })}
                                        on
                                    />
                                    {errors && errors?.name && <FormFeedback>Please type Name</FormFeedback>}
                                </Col>
                                <Col sm={12}>
                                    <label className="label text-light">Email</label>
                                    <input
                                        id="email"
                                        defaultValue={user?.email}
                                        {...register('email', { required: true })}
                                        type="email"

                                        placeholder="Enter Email"
                                        className={classnames('input form-control', { 'is-invalid': errors && errors?.email })}
                                    />
                                    {errors && errors?.email && <FormFeedback>Please type Email</FormFeedback>}
                                </Col>

                            </div>
                            <div className="info-social">

                                <Col sm={12}>
                                    <label className="label text-light">Password</label>
                                    <input
                                        // id="password"
                                        id="inputPassword"
                                        {...register('password', { required: true })}
                                        type="password"
                                        onChange={handleChangeP}
                                        placeholder="Enter Password"
                                        className={classnames('input  form-control', { 'is-invalid': errors && errors?.password })}
                                    />
                                    {errors && errors?.password && <FormFeedback>Please type Password</FormFeedback>}
                                </Col>
                                <Col sm={12}>
                                    <label className="label text-light">Mobile</label>
                                    <input
                                        id="mobile"
                                        {...register('mobile', { required: true })}
                                        type="number"
                                        placeholder="Enter Mobile No."
                                        className={classnames('input  form-control', { 'is-invalid': errors && errors?.mobile })}

                                    />
                                    {errors && errors?.mobile && <FormFeedback>Please type Mobile No.</FormFeedback>}
                                </Col>
                                <row>
                                    <Col sm={12}>
                                        <div className="form-group  md-form ">
                                            <label className="label text-light ">Date Of Birth</label>
                                            <input
                                                id="dob datetimepicker1"
                                                defaultValue={user?.dob}
                                                name="dob"
                                                type="date"

                                                placeholder="Date of Birth"
                                                {...register('dob', { required: true })}
                                                className={classnames('input-group date form-group form-control', { 'is-invalid': errors && errors?.dob })}
                                            />

                                        </div>
                                        {errors && errors?.dob && <FormFeedback>Please enter date of birth</FormFeedback>}
                                    </Col>
                                </row>

                                <Col sm={12}>  <label className="label text-light ">Gender</label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        {...register('gender', { required: true })}
                                        defaultValue={user?.gender}
                                        className={classnames('form-control', { 'is-invalid': errors && errors?.gender })}
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
                        <input className="form-control mb-3 "
                            type="text"
                            onClick={GenerateId}
                            name="transaction"
                            id="transaction"
                            {...register('transaction', { required: true })}
                            value={Generate}
                        />
                       
                       
                        <button className=" form-control font-weight-bold" type="submit">
                            <b>Join</b>
                        </button>
                        </div>
                    </form>

                </div>







            </div>
        </>
    )

}

export default Applyform
