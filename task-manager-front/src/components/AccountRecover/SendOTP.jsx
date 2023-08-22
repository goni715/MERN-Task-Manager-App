import React, {Fragment, useRef} from 'react';
import {ErrorToast, IsEmail, IsEmpty} from "../../helper/ValidationHelper";
import {RecoverVerifyEmailRequest} from "../../APIServices/CRUDServices";
import {useNavigate} from "react-router-dom";
import {selectEmail, SetEmail} from "../../redux/state-slice/OTPSlice";
import store from "../../redux/store/store";
import {ShowLoader} from "../../redux/state-slice/settings-slice";
import {useSelector} from "react-redux";
import {setEmail} from "../../helper/SessionHelper";

const SendOtp = (props) => {

    let emailRef = useRef();

    const navigate = useNavigate();





    const VerifyEmail= () => {

        let email = emailRef.value;

          if(IsEmpty(email)){
              ErrorToast("Email Address Required!");
          }
          else if(IsEmail(email)){
              ErrorToast("Valid Email Address Required!");
          }
          else{

              RecoverVerifyEmailRequest(email).then((result)=>{
                  if(result===true){

                      setEmail(email);

                      navigate('/VerifyOTP');


                  }
              })

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
                                <h4>EMAIL ADDRESS</h4>
                                <br/>
                                <label>Your email address</label>
                                <input ref={(input)=>emailRef=input}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <button onClick={VerifyEmail} className="btn w-100 animated fadeInUp float-end btnBackground">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default SendOtp;