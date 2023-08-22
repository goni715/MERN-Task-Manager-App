import React, {Fragment, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {ErrorToast} from "../../helper/ValidationHelper";
import {selectEmail, SetEmail, SetOTPCode} from "../../redux/state-slice/OTPSlice";
import {useSelector} from "react-redux";
import {RecoverVerifyOTPRequest, SignUpVerifyOTPRequest} from "../../APIServices/CRUDServices";
import {useNavigate} from "react-router-dom";
import store from "../../redux/store/store";
import {
    getEmail,
    getFirstName,
    getLastName,
    getMobile,
    getPassword, getPhoto,
    getRegEmail,
    setOTP
} from "../../helper/SessionHelper";

const SignUpVerifyOTP = (props) => {


    const navigate = useNavigate();



    let [OTP,SetOTP] = useState("");


    let  defaultInputStyle= {
        fontFamily: "monospace",
        MozAppearance: "textfield",
        margin: "4px",
        paddingLeft: "8px",
        width: "45px",
        borderRadius: '3px',
        height: "45px",
        fontSize: "32px",
        border: '1px solid lightskyblue',
        boxSizing: "border-box",
        color: "black",
        backgroundColor: "white",
        borderColor: "lightgrey"
    }


    const SubmitOTP = () => {

        if(OTP.length===6){

          SignUpVerifyOTPRequest(getRegEmail(),getFirstName(),getLastName(),getMobile(),getPassword(),getPhoto(), OTP).then((result)=>{

               if(result===true){
                   localStorage.clear();
                   navigate('/Login');
               }
          })




        }
        else{
            ErrorToast("Enter 6 Digit Code");
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
                                <h4>OTP VERIFICATION </h4>
                                <p>A 6 Digit verification code has been sent to your email address <span className="text-bold">{getRegEmail()}</span> </p>
                                <ReactCodeInput onChange={(value)=>SetOTP(value)} inputStyle={defaultInputStyle} fields={6}/>
                                <br/>  <br/>
                                <button onClick={SubmitOTP} className="btn w-100 animated fadeInUp float-end btnBackground">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SignUpVerifyOTP;