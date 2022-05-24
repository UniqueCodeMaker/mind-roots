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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import NavBar from "../NavBar"
const Applyform = () => {
    let navigate = useNavigate()
    const START = 123;
    const END = 456;
    const form = useRef();
    const num = Math.floor(Math.random() * (START - END + 1)) + END;

    function GenerateId(e) {
        e.preventDefault();
        setGenerate(num);

    }

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('Mygmail1304', 'Mytemp1304', e.target, 'qY4WZ3P78KAZ_aTap')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    const notify = () => toast("User Added Successfully",
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

    })
    const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: 'onChange', resolver: yupResolver(registerUser) })
    const onSubmit = async (data) => {
        data.ImageUrl = localStorage.getItem('ImageUrl');


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        };
        const res = await fetch('http://localhost:5000/apply', requestOptions)
        
        notify();
        test2();
        
        localStorage.setItem('Login' ,  Username)
        navigate(`/ClientPanel`);
    }
    

    const onError = (errors, e) => console.log(errors, e);



    return (
        <>
            <NavBar />

            <div className="ApplyForm">
                <ToastContainer />
                <div className="FormPanel d-flex justify-content-center BackTrans">
                  
                    <form className=" form-control mb-3 row " ref={form} onSubmit={handleSubmit(onSubmit, onError , sendEmail)}>
                        <h3 className="titleForm">Join MRT Club</h3>
                        <div className="form-infor-profile">
                            <div className="info-account">

                                <ImageUpload />
                                <Col sm={12}>
                                    <label className="label label-primary ">Name</label>
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
                                    <label className="label label-primary">Email</label>
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
                                    <label className="label label-primary">Password</label>
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
                                    <label className="label label-primary">Mobile</label>
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
                                            <label className="label label-primary ">Date Of Birth</label>
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

                                <Col sm={12}>  <label className="label label-primary ">Gender</label>
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
                        </div>
                        <input className="form-control"
                            type="text"
                            onClick={GenerateId}
                            name="transaction"
                            id="transaction"
                            {...register('transaction', { required: true })}
                            value={Generate}
                        />
                        <br />
                        <button className=" font-weight-bold tn btn-outline-primary form-control" type="submit">
                            <b>Join</b>
                        </button>
                    </form>

                </div>







            </div>
        </>
    )

}

export default Applyform
