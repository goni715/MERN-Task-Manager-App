import React, {Fragment, useEffect, useRef} from 'react';
import logo from "../../assets/images/logo.svg";
import {ProfileUpdateRequest, selectProfileDetailsRequest} from "../../APIServices/CRUDServices";
import {useSelector} from "react-redux";
import {selectProfileData} from "../../redux/state-slice/profileSlice";
import {
    ErrorToast,
    getBase64,
    IsEmail,
    IsEmpty,
    IsMobile, IsNonWhiteSpace,
    IsValidLength,
    PasswordShowHide
} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {GoEye, GoEyeClosed} from "react-icons/go";

const Profile = (props) => {

    let emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef, userImgPreviewRef,userImgRef,showBtnRef = useRef();

    useEffect(()=>{
        selectProfileDetailsRequest();
    },[])


    const ProfileDataArray = useSelector(selectProfileData);



 const PreviewImage = () => {

     let ImgFile = userImgRef.files[0];

       getBase64(ImgFile).then((base64Img)=> {

           userImgPreviewRef.src=base64Img;

       })

 }



 const navigate = useNavigate();

 const UpdateMyProfile = () => {

     let email = emailRef.value;
     let firstName = firstNameRef.value;
     let lastName = lastNameRef.value;
     let mobile = mobileRef.value;
     let password = passwordRef.value;
     let photo = userImgPreviewRef.src;

     if(IsEmail(email)){
         ErrorToast("Valid Email Adress Required!");
     }
     else if(IsEmpty(firstName)){
         ErrorToast("First Name Required!");
     }
     else if(IsEmpty(lastName)){
         ErrorToast("Last Name Required!");
     }
     else if(IsEmpty(mobile)){
         ErrorToast("Mobile Number Required!");
     }
     else if(IsMobile(mobile)){
         ErrorToast("Valid Mobile Number Required!");
     }
     else if(IsEmpty(password)){
         ErrorToast("Password Required!");
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

          ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{

              if(result===true){
                  navigate('/');
              }
          })

     }

 }




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
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <img ref={(input)=>userImgPreviewRef=input} className="icon-nav-img-lg" src={ProfileDataArray['photo']} alt=""/>
                                    <hr/>
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <input onChange={PreviewImage} ref={(input)=>userImgRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <input key={Date.now()} readOnly={true} defaultValue={ProfileDataArray['email']} ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <input key={Date.now()} defaultValue={ProfileDataArray['firstName']} ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <input key={Date.now()} defaultValue={ProfileDataArray['lastName']} ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <input key={Date.now()} defaultValue={ProfileDataArray['mobile']} ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                        </div>
                                        <div className="col-md-4 p-2 passwordField">
                                            <input key={Date.now()}  defaultValue={ProfileDataArray['password']} onChange={PasswordBtnShowHide} ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp passwordInput" type="password"/>
                                            <GoEye onClick={ShowHide} id="showIcon"/>
                                            <GoEyeClosed onClick={ShowHide} id="hideIcon"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <button onClick={UpdateMyProfile}  className="btn w-100 float-end btnBackground animated fadeInUp">Update</button>
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

export default Profile;