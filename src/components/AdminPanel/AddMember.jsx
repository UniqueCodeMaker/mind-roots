import React, { useState, useEffect } from 'react';
import "../../App.css";

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import classnames from 'classnames'
import { Col, Row, FormFeedback } from 'reactstrap'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import NavBar from '../NavBar'
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

    const [details, setDetails] = useState(intialVal);
    useEffect(() => {
        test2();


    }, []);
    const START = 123;
    const END = 456;
    const form = useRef();
    const num = Math.floor(Math.random() * (START - END + 1)) + END;

    function GenerateId(e) {
        e.preventDefault();
        setGenerate(num);

    }


    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs.sendForm('Mygmail1304', 'Mytemp1304', e.target, 'qY4WZ3P78KAZ_aTap')
    //       .then((result) => {
    //           console.log(result.text);
    //       }, (error) => {
    //           console.log(error.text);
    //       });
    //   };




    const [user, setUser] = useState([])
    console.log(user)
    const [Generate, setGenerate] = useState("Generate Transaction Id")

    const registerUser = yup.object().shape({
        name: yup.string().min(3),
        password: yup.string().min(4).max(16),
        email: yup.string().email(),
        dob: yup.date(),
        mobile: yup.number(),
        gender: yup.string(),
    })
    const { register, formState: { errors }, handleSubmit, watch, reset } = useForm({ mode: 'onChange', resolver: yupResolver(registerUser) })

    const onSubmit = async (data) => {
        console.log({data});
        
        data.dob = "2022-05-09";
        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type':  "application/json",
                'Accept':  'application/json'
            },
            body: JSON.stringify(data),
        };
        const res = await fetch('http://localhost:5000/Edit', requestOptions)
        
        console.log(res);

    }



    const onError = (errors, e) => console.log(errors, e);

    const [Check, setCheck] = useState([{}]);
    // const [loading, setloading] = useState(false);




    const test2 = async () => {
        await fetch(`http://localhost:5000/`)
            .then((response) => response.json())
            .then((actualData) => setCheck(actualData)
            
            )
    }

    const userSelected = watch('User')
    console.log(userSelected)
    return (
        <>
        <NavBar/>
      <div className="ApplyForm">

            <div className="FormPanel d-flex justify-content-center BackTrans">
                {/* <span className="Logo">
                    <img src={Logo} alt="Logo" />
                </span> */}

                <form className=" form-control mb-3 row " ref={form} onSubmit={handleSubmit(onSubmit, onError)}>
                    <h3 className="titleForm">Edit Record</h3>
                    <div className="form-infor-profile">
                        <div className="info-account">
                            
                                <Col sm={12}>
                                    <select
                                        name="User"
                                        id="User"
                                        {...register('User', {
                                            onChange: async () => {
                                                await fetch(`http://localhost:5000/test/${watch('User')}`)
                                                    .then((res) => res.json())
                                                    .then((Data) => {
                                                        setDetails(...Data);

                                                        setUser(Data)
                                                    }
                                                    )

                                            }
                                        })}
                                        className="SelectUser form-control"

                                    >
                                        {/* <option value="Select Users" hidden selected>Select Users</option> */}
                                        {Check.map((checks) => <option value={checks.name}  >{checks.name}</option>)
                                        }
                                    </select>
                                </Col>

                                <Col sm={12}>
                                    <label className="label label-primary ">Name</label>
                                    <input
                                        id="name"
                                        defaultValue={details.name}
                                        {...register('name', { required: true })}
                                        type="text"
                                        placeholder="Enter Name"
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
                                        className={classnames('input  form-control', { 'is-invalid': errors && errors?.password })}
                                    />
                                    {errors && errors?.password && <FormFeedback>Please type Password</FormFeedback>}
                                </Col>
                                <Col sm={12}>
                                    <label className="label label-primary">Mobile</label>
                                    <input
                                        id="mobile"
                                        {...register('mobile', { required: true })}
                                        type="test"
                                        placeholder="Enter Mobile No."
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
                                            defaultValue={details.dob}               
                                            
                                            name="dob"
                                            type="date"
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
                    />
                    <br />
                    <button className=" font-weight-bold tn btn-outline-primary form-control" type="submit">
                        Edit
                    </button>
                  
                </form>

            </div>







        </div>

        </>

        )

}

export default AddMember
