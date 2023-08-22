import React, {Fragment, useEffect, useRef} from 'react';
import {
    ErrorToast,
    IsEmail,
    IsEmpty,
    IsMobile,
    IsNonWhiteSpace, IsPasswordStrength, IsSpecialCharacter,
    IsValidLength, PasswordShowHide,
    SuccessToast
} from "../../helper/ValidationHelper";
import {RegistrationRequest} from "../../APIServices/CRUDServices";
import {useNavigate} from "react-router-dom";
import store from "../../redux/store/store";
import {ShowLoader} from "../../redux/state-slice/settings-slice";
import { FaRegEye } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectShowBtn, SetClass} from "../../redux/state-slice/profileSlice";

const Registration = (props) => {



    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,showBtnRef=useRef();

    let navigate = useNavigate();


    const onRegistration = () => {

        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = "data:image/png;base64,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";


        if(IsEmpty(email)) {
            ErrorToast("Email is Required");
        }
        else if(IsEmail(email)) {
            ErrorToast("Valid Email Address Required");
        }
        else if(IsEmpty(firstName)){
            ErrorToast("First Name Required");
        }
        else if(IsEmpty(lastName)){
            ErrorToast("Last Name Required");
        }
        else if(IsEmpty(mobile)){
            ErrorToast("Mobile Number Required");
        }
        else if(IsMobile(mobile)){
            ErrorToast("Valid Mobile Number Required");
        }
        else if(IsEmpty(password)){
            ErrorToast("Password Required");
        }
        else if(password.length<5){
            ErrorToast("Your password must be at least 5 characters");
        }/*
        else if(password.search(/[a-z]/i) < 0){
            ErrorToast("Your password must contain at least one letter.");
        }
        else if(password.search(/[0-9]/) < 0){
            ErrorToast("Your password must contain at least one number.");
        }*/
        else if(IsValidLength(password)){
            ErrorToast("Password must be 5-16 Characters Long!");
        }
        else if(IsNonWhiteSpace(password)){
            ErrorToast("Password must not contain Whitespaces!")
        }/*
        else if(IsSpecialCharacter(password)){
            ErrorToast("password should contain atleast special character");
        }*/
        else{

            RegistrationRequest(email, firstName, lastName, mobile, password, photo).then((result)=>{

                 if(result === true){
                     navigate("/Login");
                 }

            })

        }


    }




//PasswordShowHide
    const ShowHide = () => {

        let password = passwordRef;
        let showBtn = showBtnRef;

        PasswordShowHide(password,showBtn);
    }


   const PasswordBtnShowHide = () => {

       let password = passwordRef.value;
       let showBtn = showBtnRef;

        if(password.length !== 0){

            showBtn.classList.add('ShowBtnActive');

        }
        else if(password.length === 0){
            showBtn.classList.remove('ShowBtnActive');
        }

   }



    return (

        <Fragment>
            <title>{props.title}</title>
        <div className="container">
            <div className="row  justify-content-center">
                <div className="col-md-10 col-lg-10 center-screen">
                    <div className="card animated fadeIn w-100 p-3">
                        <div className="card-body">
                            <h5>Sign Up</h5>
                            <hr/>
                            <div className="container-fluid m-0 p-0">
                                <div className="row m-0 p-0">
                                    <div className="col-md-4 p-2">
                                        <label>Email Address</label>
                                        <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>First Name</label>
                                        <input ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Last Name</label>
                                        <input ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Mobile Number</label>
                                        <input ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <Form.Label htmlFor="basic-url">Password</Form.Label>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                placeholder="User Password"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                ref={(input)=>passwordRef=input}
                                                type="password"
                                                className="form-control animated fadeInUp"
                                                onChange={PasswordBtnShowHide}
                                            />
                                                <button onClick={ShowHide} ref={(input)=>showBtnRef=input} className="showBtn bg-info">Show</button>
                                        </InputGroup>
                                    </div>

                                </div>
                                <div lassName="row mt-2 p-0">
                                    <div className="col-md-4 p-2">
                                        <button onClick={onRegistration} className="btn mt-3 w-100 float-end btn-primary animated fadeInUp">Sign Up</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

        </Fragment>

    );
};

export default Registration;