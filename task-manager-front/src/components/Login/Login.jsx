import React, {Fragment, useRef} from 'react';
import {Link} from "react-router-dom";
import {LoginRequest} from "../../APIServices/CRUDServices";
import {ErrorToast, IsEmail, IsEmpty, PasswordShowHide} from "../../helper/ValidationHelper";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {GoEye, GoEyeClosed} from "react-icons/go";


const Login = (props) => {


   let emailRef,passwordRef,showBtnRef, SignInBtnRef = useRef();



    const onLogin = () => {

       let email = emailRef.value;
       let password = passwordRef.value;


       if(IsEmpty(email)) {
           ErrorToast("Email is Required");
       }
       else if(IsEmail(email)) {
           ErrorToast("Valid Email Address Required");
       }
       else if(IsEmpty(password)){
           ErrorToast("Password Required");
       }
       else{

           LoginRequest(email, password, SignInBtnRef).then((result)=>{

               if(result === true){

                   setTimeout(function(){
                       window.location.href="/";
                   },500);

                }

           })

       }



   }//onLoginFunctionEnded




//PasswordShowHide
    const ShowHide = () => {

        let password = passwordRef;
        let showIcon = document.getElementById('showIcon');
        let hideIcon = document.getElementById('hideIcon');

        PasswordShowHide(password,showIcon,hideIcon);
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
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h5>Sign IN</h5>
                                <br/>
                                <div className="container-fluid m-0 p-0">
                                <div className="row m-0 p-0">
                                <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3">
                                <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp formInput" type="email"/>
                                </div>
                                <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3">
                                    <input onChange={PasswordBtnShowHide} ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp passwordInput" type="password"/>
                                    <GoEye onClick={ShowHide} id="showIcon"/>
                                    <GoEyeClosed onClick={ShowHide} id="hideIcon"/>
                                </div>

                                <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12">
                                   <button onClick={onLogin} ref={(input)=>SignInBtnRef=input} className="btn w-100 animated fadeInUp float-end btnBackground">Sign In</button>

                                 </div>
                                </div>
                                </div>
                                <div className="float-end mt-3">

                                    <span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/SignUp">Sign Up </Link>
                                        <span className="ms-1">||</span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/SendOTP">Forgot Password</Link>
                                    </span>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;