import React , {  useState , useRef , useEffect } from "react";
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, FormFeedback } from 'reactstrap'
import ImageUpload from "../ImageUpload.jsx"
import ImageUploading from "react-images-uploading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import NavBar from "../NavBar"
import SideNavbar from "../../Sidebar"
const AddEvent =()=> {
  const notify = () => toast("Event Added Successfully", 
	{
	  transition: Zoom
	});
    const [user, setUser] = useState()
    const form = useRef();   
    const registerUser = yup.object().shape({
        lead: yup.string().min(3).required(),
        event: yup.string().min(3).required(),
        edate: yup.date().required(),
        etime: yup.string().required(),
        location: yup.string().required(),
        budget: yup.string().required(),
        fees: yup.string().required(),
       
    })

    const { register, formState: { errors }, handleSubmit , reset} = useForm({ mode: 'onChange', resolver: yupResolver(registerUser) })
    const onSubmit = async (data) =>  {
        data.EImageUrl = localStorage.getItem('EImageUrl');
       
        const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        };
        const res = await fetch('http://localhost:5000/eventlog', requestOptions)
        const response = res.json();
      
        notify();
        reset();
        setImages("")
    }

    const onError = (errors, e) => console.log(errors, e);

    const [images, setImages] = React.useState([]);
    const [images2, setImages2] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
      
      setImages(imageList);
      setImages2(imageList[0].data_url)
   
    };
  
  
  const [ViewBtn, setViewBtn] = React.useState("image-upload");
  const HideBtn = () =>
  {
      setViewBtn("hidden");
  }

  localStorage.setItem("EImageUrl" , images2);






    return(
<>
      <NavBar/>
      <SideNavbar/>
<div className="HomeLogin">
                  
                  <ToastContainer />
                   <div className="box">
      <div className="header">
          <p>Add Event</p>
      </div>

      <form className="AddEventF"  ref={form} onSubmit={handleSubmit(onSubmit , onError)}>
      <div className="ImageUpload">
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: "red" } : null}
            onClick={onImageUpload}
           type="button"
            {...dragProps}
          >
           <div className={ViewBtn}>
<label htmlFor="file-input">
  <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png"
  onClick={HideBtn}
  onDrop={HideBtn}
  alt="upload"
  style={{width:"100px"}}
  />
          <h5>Upload Event Cover</h5>
</label>
              </div>
          </button>
          &nbsp;
        {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.data_url} alt="" width="100" />
              
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  </div>
          <div className="row ">
              <div className="col-2">
                  <p className="text-light">Event Leader</p>
              </div>
              <div className="col-12 JustifyF  ">
                  <input type="text" 
                    id="lead"
                    defaultValue={user?.lead}
                    {...register('lead', { required: true })}
                    placeholder="Enter Leader Name"
                    className={classnames('input form-control', { 'is-invalid': errors && errors?.lead })}
                  />
                  {errors && errors?.lead && <FormFeedback>Please type Leader's name</FormFeedback>}
              </div>
              
          </div>

          <div className="row">
              <div className="col-2">
                  <p className="text-light">Event Name</p>
              </div>
              <div className="col-12">
                  <input type="text"
                   id="event"
                   defaultValue={user?.event}
                   {...register('event', { required: true })}
                   placeholder="Enter event Name"
                   className={classnames('input form-control', { 'is-invalid': errors && errors?.event })}
                 />
                 {errors && errors?.event && <FormFeedback>Please type event name</FormFeedback>}
              </div>
          </div>

          <div className="row">
              <div className="col-2 ">
                  <p className="text-light">Event Date</p>
              </div>
              <div className="col-12">
                  <input type="date" 
                     id="edate"
                     defaultValue={user?.edate}
                     {...register('edate', { required: true })}
                    //  placeholder="Enter event date"
                     className={classnames('input-group date form-group form-control selftest', { 'is-invalid': errors && errors?.edate })}
                   />
                   {errors && errors?.edate && <FormFeedback>Please type event date</FormFeedback>}
              </div>
          </div>

          <div className="row">
              <div className="col-2">
                  <p className="text-light">Event Location</p>
              </div>
              <div className="col-12">
                  <input type="text"
                     id="location"
                     defaultValue={user?.location}
                     {...register('location', { required: true })}
                     placeholder="Enter event location"
                     className={classnames('input form-control', { 'is-invalid': errors && errors?.location })}
                   />
                   {errors && errors?.location && <FormFeedback>Please type event location</FormFeedback>}
              </div>
          </div>  

         

          <div className="row">
              <div className="col-2">
                  <p className="text-light">Event Timing</p>
              </div>
              <div className="col-12">
                  <input type="time"
                    id="etime"
                    defaultVaqlue={user?.etime}
                    {...register('etime', { required: true })}
                    placeholder="Enter event time"
                    className={classnames('input form-control selftest', { 'is-invalid': errors && errors?.etime })}
                  />
                  {errors && errors?.etime && <FormFeedback>Please type event Time</FormFeedback>}
              </div>
          </div>


          <div className="row">
              <div className="col-2">
                  <p className="text-light">Event Budget</p>
              </div>
              <div className="col-12">
                  <input type="text"
                  id="budget"
                  defaultValue={user?.budget}
                  {...register('budget', { required: true })}
                  placeholder="Enter event budget"
                  className={classnames('input form-control', { 'is-invalid': errors && errors?.budget })}
                />
                {errors && errors?.budget && <FormFeedback>Please type event budget</FormFeedback>}
              </div>
          </div>

          <div className="row">
              <div className="col-2">
                  <p className="text-light">Fees Amount</p>
              </div>
              <div className="col-12">
                  <input type="text"
                     id="fees"
                     defaultValue={user?.fees}
                     {...register('fees', { required: true })}
                     placeholder="Enter event fees"
                     className={classnames('input form-control', { 'is-invalid': errors && errors?.budget })}
                   />
                   {errors && errors?.fees && <FormFeedback>Please type event fees</FormFeedback>}
              </div>
          </div>

       

          <div className="row">
              <div className="col-12">
                  <button className="btn ownDark BtnWDHT " type = "submit">Add</button>
                  
              </div>
          </div>

      </form>

  </div>
              </div>
</>


    );
}
export default AddEvent;