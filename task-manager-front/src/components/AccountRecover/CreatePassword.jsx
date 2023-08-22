import React, {Fragment, useRef} from 'react';
import {
    ErrorToast,
    IsEmpty,
    IsNonWhiteSpace,
    IsValidLength,
    NewPasswordShowHide
} from "../../helper/ValidationHelper";
import {RecoverResetPasswordRequest} from "../../APIServices/CRUDServices";
import {useSelector} from "react-redux";
import {selectEmail, selectOTP} from "../../redux/state-slice/OTPSlice";
import {getEmail, getOTP, removeSessions} from "../../helper/SessionHelper";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {useNavigate} from "react-router-dom";
import {GoEye, GoEyeClosed} from "react-icons/go";

const CreatePassword = (props) => {

   let passwordRef,ConfirmPasswordRef, showBtnRef = useRef();

    const navigate = useNavigate();



   const ResetPassword = () => {

       let password = passwordRef.value;
       let confirmPassword = ConfirmPasswordRef.value;

        if(IsEmpty(password)){
            ErrorToast("Password Required!");
        }
        else if(IsEmpty(confirmPassword)){
            ErrorToast("Confirm Password Required!");
        }
        else if(password.length<5){
            ErrorToast("Password must be at least 5 characters");
        }
        else if(confirmPassword.lenght<5){
            ErrorToast("Confirm password must be at least 5 characters");
        }
        else if(password !== confirmPassword){
            ErrorToast("Password & Confirm Password Should be Same");
        }
        else if(IsValidLength(password)){
            ErrorToast("Password must be 5-16 Characters Long!");
        }
        else if(IsNonWhiteSpace(password)){
            ErrorToast("Password must not contain Whitespaces!")
        }
        else{

             RecoverResetPasswordRequest(getEmail(),getOTP(),password).then((result)=>{
                 if(result===true){

                     localStorage.clear();

                     navigate('/Login');

                 }
             })
        }

   }




//PasswordShowHide
    const ShowHide = () => {

        let password = passwordRef;
        let confirmPassword = ConfirmPasswordRef;
        let showIcon = document.getElementById('showIcon');
        let hideIcon = document.getElementById('hideIcon');
        //let showBtn = showBtnRef;

        NewPasswordShowHide(password,confirmPassword,showIcon,hideIcon);
    }


    const PasswordBtnShowHide = () => {


        let password = passwordRef.value;
        let passwordType = passwordRef.type;
        let showIcon = document.getElementById('showIcon');
        let hideIcon = document.getElementById('hideIcon');

        if(password.length !== 0 && passwordType==="password"){

            showIcon.classList.add('ShowBtnActive');

        }
        else if(password.length !== 0 && passwordType==="text"){

            hideIcon.classList.add('ShowBtnActive');

        }
        else if(password.length === 0 && passwordType==="password"){

            showIcon.classList.remove('ShowBtnActive');
            hideIcon.classList.remove('ShowBtnActive');
        }
        else if(password.length === 0 && passwordType==="text"){

            showIcon.classList.remove('ShowBtnActive');
            hideIcon.classList.remove('ShowBtnActive');
        }

    }








    return (
        <Fragment>
            <title>{props.title}</title>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <div className="container-fluid m-0 p-0">
                                    <div className="row m-0 p-0">
                                        <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3">
                                            <input defaultValue={getEmail()} readOnly={true} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                        </div>
                                        <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3">
                                            <input onChange={PasswordBtnShowHide} ref={(input)=>passwordRef=input} placeholder="New Password" className="form-control animated fadeInUp passwordInput" type="password"/>
                                            <GoEye onClick={ShowHide} id="showIcon"/>
                                            <GoEyeClosed onClick={ShowHide} id="hideIcon"/>
                                        </div>
                                        <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3">
                                            <input ref={(input)=>ConfirmPasswordRef=input} placeholder="Confirm Password" className="form-control animated fadeInUp formInput" type="password"/>
                                        </div>
                                    </div>
                                </div>


                                <br/>

                                { /*<Form.Label htmlFor="basic-url">New Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="User Password"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        ref={(input)=>passwordRef=input}
                                        type="password"
                                        className="form-control animated fadeInUp"
                                    />
                                    <button onClick={ShowHide} ref={(input)=>showBtnRef=input} className="showBtn bg-info">Show</button>
                                </InputGroup>
                                <br/>
                                <label>Confirm Password</label>
                                <input ref={(input)=>ConfirmPasswordRef=input} placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>*/}
                                <button onClick={ResetPassword} className="btn w-100 animated fadeInUp float-end btnBackground">Set Password</button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreatePassword;