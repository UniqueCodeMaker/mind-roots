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
import Flatpickr from 'react-flatpickr'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {  Link } from "react-router-dom";
  import SideNavbar from "../../Sidebar";
  import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
const intialVal = {
    "EImageUrl": "",
    "lead": "",
    "event": "",
    "edate": "",
    "location": "",
    "etime": "",
    "budget": "",
    "fees": "",
    "id": ""
};


const notify = () => toast("Event Updated successfully", 
{
  transition: Zoom
});

const AddMember = () => {

    const [details, setDetails] = useState(intialVal);
   useLayoutEffect(() => {
        test2();
        setChangeD("text")
        setChangeT("text")
        const EventSelected  = localStorage.getItem("event")
        
        fetch(`http://localhost:5000/EventSelected/${EventSelected}`)
        .then((response) => response.json())
        .then((actualData) => setDetails(...actualData))
       
        
    }, []);
    const START = 123;
    const END = 456;
    const form = useRef();
    const num = Math.floor(Math.random() * (START - END + 1)) + END;

    function GenerateId(e) {
        e.preventDefault();
        setGenerate(num);

    }


   

    const handleChange = (e) => {
       
        setDetails({
        ...details,
        [e.target.name] : e.target.value
        })
    }

    const [user, setUser] = useState([])
    
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
  
        
        details.dob = moment().format('YYYY-MM-DD')
        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type':  "application/json",
                'Accept':  'application/json'
            },
            body: JSON.stringify(details),
        };
        const res = await fetch('http://localhost:5000/Editevent', requestOptions)
        
        notify();
        setChangeD("date")
        setChangeT("time")
        setDetails("")
        
      

    }



    const onError = (errors, e) => console.log(errors, e);
    
    const [Check, setCheck] = useState([{}]);
    const [ChangeD, setChangeD] = useState("date");
    const [ChangeT, setChangeT] = useState("time");
    
    // const [loading, setloading] = useState(false);
    
    
    
    
    const test2 = async () => {
        await fetch(`http://localhost:5000/View`)
        .then((response) => response.json())
        .then((actualData) => setCheck(actualData)
        
        )
    }
    
    return (
        <>
        <NavBar/>
        <SideNavbar/>
      <div className="ApplyForm">
      <ToastContainer />
            <div className="FormPanel d-flex justify-content-center BackTrans">
        
                <form className=" form-control mb-3 row  TestForm" ref={form} onSubmit={handleSubmit(onSubmit, onError)}>
                    <h3 className="d-flex justify-content-center">Edit Events</h3>
                    <div className="form-infor-profile">
                        <div className="info-account">
                        
                                {/* <Col sm={12}>
                                    <select
                                        name="User"
                                        id="User"
                                        {...register('User', {
                                            onChange: async () => {
                                                await fetch(`http://localhost:5000/events/${watch('User')}`)
                                                    .then((res) => res.json())
                                                    .then((Data) => {
                                                        setDetails(...Data);
                                                        setChangeT("text")
                                                        setChangeD("text")
                                                        setUser(Data)
                                                    }
                                                    )

                                            }
                                        })}
                                        className="SelectUser form-control hidden"

                                    >
                                        <option value="Select Users" hidden selected>Select Users</option> 
                                        {details.map((checks) => <option value={checks.event}  >{checks.event}</option>)
                                        }
                                    </select>
                                </Col> */}

                                <Col sm={12}>
                                    <label className="label label-primary ">Event Lead</label>
                                    <input
                                        id="lead"
                                        defaultValue={details.lead}
                                        {...register('lead', { required: true })}
                                        type="text"
                                        placeholder="Enter leader Name"
                                        className={classnames('input form-control', { 'is-invalid': errors && errors?.lead })}
                                        onChange={handleChange}
                                    />
                                    {errors && errors?.lead && <FormFeedback>Please type leader's  Name</FormFeedback>}
                                </Col>
                                <Col sm={12}>
                                    <label className="label label-primary">Event Name</label>
                                    <input
                                        id="event"
                                        defaultValue={details.event}
                                        {...register('event', { required: true })}
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="Enter event name"
                                        className={classnames('input form-control', { 'is-invalid': errors && errors?.event })}
                                    />
                                    {errors && errors?.event && <FormFeedback>Please type Event Name</FormFeedback>}
                                </Col>

                                        
                        </div>
                        <div className="info-social">
                           
                                <Col sm={12}>
                                    <label className="label label-primary">Date</label>
                                    <input
                                        // id="password"
                                        id="edate"
                                        onChange={handleChange}
                                        value = {moment(details.edate).format('YYYY-MM-DD') }
                                        {...register('edate', { required: true })}
                                        type={ChangeD}
                                        placeholder="Enter date"
                                        className={classnames('input  form-control', { 'is-invalid': errors && errors?.edate })}
                                        
                                    />
                                    {errors && errors?.edate && <FormFeedback>Please type date</FormFeedback>}
                                </Col>
                                <Col sm={12}>
                                    <label className="label label-primary">Location</label>
                                    <input
                                        id="location"
                                        onChange={handleChange}
                                        {...register('location', { required: true })}
                                        type="text"
                                        placeholder="Enter location"
                                        className={classnames('input  form-control', { 'is-invalid': errors && errors?.location })}
                                        defaultValue={details.location}
                                    />
                                    {errors && errors?.location && <FormFeedback>Please type location </FormFeedback>}
                                </Col>

                                <Col sm={12}>
                                    <div className="form-group  md-form ">
                                        <label className="label label-primary ">Time</label>
                                        <input
                                            id="etime"
   value={moment(details.etime ,  "HH:mm:ss").format("hh:mm A")}               
   onChange={handleChange}
                                            name="etime"
                                            type={ChangeT}
                                            // id='datetimepicker1'
                                            placeholder="Enter time"
                                            {...register('etime', { required: true })}
                                            className={classnames('input-group date form-group form-control', { 'is-invalid': errors && errors?.etime })}
                                        />

                                    </div>
                                    {errors && errors?.etime && <FormFeedback>Please enter time</FormFeedback>}
                                </Col>
                                    <Col sm={12}>
                                        <div className="form-group  md-form ">
                                            <label className="label label-primary ">budget</label>
                                            <input
                                                id="budget"
                                                  defaultValue={details.budget}               
                                                  onChange={handleChange}                    
                                                name="budget"
                                                type="text"
                                                // id='datetimepicker1'
                                                placeholder="Enter budget"
                                                {...register('budget', { required: true })}
                                                className={classnames('input-group date form-group form-control', { 'is-invalid': errors && errors?.budget })}
                                            />

                                        </div>
                                    {errors && errors?.budget && <FormFeedback>Please enter budget</FormFeedback>}
                                </Col>
                                <Col sm={12}>
                                        <div className="form-group  md-form ">
                                            <label className="label label-primary ">fees</label>
                                            <input
                                                id="fees"
                                                defaultValue={details.fees}               
                                                onChange={handleChange}
                                                name="fees"
                                                type="text"
                                                // id='datetimepicker1'
                                                placeholder="Enter fees"
                                                {...register('fees', { required: true })}
                                                className={classnames('input-group date form-group form-control', { 'is-invalid': errors && errors?.fees })}
                                            />

                                        </div>
                                    {errors && errors?.fees && <FormFeedback>Please enter fees</FormFeedback>}
                                </Col>

                       
                            <br />
                    <div className="d-flex flex-row justify-content-around">
                    <button className=" font-weight-bold btn  bg-transparent text-light w-10 p-3 border-2 border-light "   type="submit">
                        Edit
                    </button>

                    <Link to="/editevent"  className=" font-weight-bold btn  bg-transparent text-light w-10 p-3 border-2 border-light " > {`>`}</Link>
                    </div>
                       
                        </div>
                    </div>
                 
                </form>

            </div>







        </div>

        </>

        )

}

export default AddMember
