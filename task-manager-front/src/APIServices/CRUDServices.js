import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {getToken, setToken, setUserDetails} from "../helper/SessionHelper";
import {SetCancelledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state-slice/task-slice";
import {SetSummary} from "../redux/state-slice/summary-slice";
import {SetProfile} from "../redux/state-slice/profileSlice";

const BaseURL = "http://127.0.0.1:5000/api/v1";
//const BaseURL = "https://mern-task-manager-goni.herokuapp.com/api/v1";
//const BaseURL = "http://express.gonihales.xyz/api/v1";


const AxiosHeader = {headers:{"token":getToken()}}


//Registration//DataInsert
export function RegistrationRequest(Email,FirstName,LastName,Mobile,Password,Photo ){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/registration";

    let PostBody={
         email: Email,
         firstName: FirstName,
         lastName: LastName,
         mobile: Mobile,
         password: Password,
         photo:Photo

    }

    return axios.post(URL,PostBody).then((res)=>{

        store.dispatch(HideLoader());

        if(res.status === 200) {

            if(res.data['status'] === "fail"){

                if(res.data['data']['keyPattern']['email'] === 1){

                    ErrorToast("Email Already Exist");
                    return false;

                }
                else{

                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{

                SuccessToast("Registration Success");
                return true;

            }
        }
        else{
            ErrorToast("Something Went Wrong");
        }

    }).catch((error)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong")
        return false;
    });

}





//DataInsert//onLogin
export function LoginRequest(Email,Password,SignInBtnRef){

    store.dispatch(ShowLoader());

    SignInBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
        "  Processing...";

    let URL = BaseURL+"/login";

    let PostBody={
        email: Email,
        password: Password

    }

    return axios.post(URL,PostBody).then((res)=>{

        store.dispatch(HideLoader());

        SignInBtnRef.innerHTML="Sign In";

        if(res.status===200){

            if(res.data['status'] === "success"){

                let MyToken = res.data['token'];
                let userDetails = res.data['data'];

                setToken(MyToken);
                setUserDetails(userDetails);

                SuccessToast("Login Success");
                return true;
            }
            else{

                store.dispatch(HideLoader());
                SignInBtnRef.innerHTML="Sign In";
                ErrorToast("Email or Password Wrong!");
                return  false;
            }

        }
        else{
            store.dispatch(HideLoader());
            SignInBtnRef.innerHTML="Sign In";
            ErrorToast("Something Went Wrong");
            return false;
        }

    }).catch((error)=>{

        //console.log(error);
        //debugger;
        store.dispatch(HideLoader());
        SignInBtnRef.innerHTML="Sign In";
        ErrorToast("Something Went Wrong");
        return false;
    });

}



//DataInsert//TaskCreate
export function NewTaskRequest(Title,Description ){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/createTask";

    let PostBody={
        title:Title,
        description:Description,
        status:"New"

    }

    return axios.post(URL,PostBody, AxiosHeader).then((res)=>{

       store.dispatch(HideLoader());

        if(res.status==200){

            SuccessToast("New Task Created");
            return true;

        }else{

            ErrorToast("Something Went Wrong");
            return  false;
        }

    }).catch((error)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    });

}

//SelectTask
export function selectTaskByStatusRequest(Status){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/selectTaskByStatus/"+Status;


   return axios.get(URL, AxiosHeader).then((res)=>{

        store.dispatch(HideLoader());

        if(res.status==200){

            let myJsonTaskData = res.data['data'];

            if(Status=="New"){

                store.dispatch(SetNewTask(myJsonTaskData));
            }
            else if(Status=="Progress"){

                store.dispatch(SetProgressTask(myJsonTaskData));
            }
            else if(Status=="Completed"){

                store.dispatch(SetCompletedTask(myJsonTaskData));
            }
            else if(Status=="Cancelled"){

                store.dispatch(SetCancelledTask(myJsonTaskData));
            }

        }else{

            ErrorToast("Something Went Wrong");
            return  false;
        }

    }).catch((error)=>{

       store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    });

}



//SelectTask// Task Summary
export function taskStatusCountRequest(){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/taskStatusCount";


    return axios.get(URL, AxiosHeader).then((res)=>{

        store.dispatch(HideLoader());

        if(res.status==200){

            let myJsonData = res.data['data'];

            store.dispatch(SetSummary(myJsonData));


        }else{

            ErrorToast("Something Went Wrong");
            return  false;
        }

    }).catch((error)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    });


}




//DeleteTask
export function DeleteTaskRequest(ID,Status){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/deleteTask/"+ID;

    return axios.get(URL, AxiosHeader).then((res)=>{

        store.dispatch(HideLoader());

        if(res.status==200){

            SuccessToast("Delete Successful")

            selectTaskByStatusRequest(Status);
            return true;


        }else{

            ErrorToast("Something Went Wrong!");
            return  false;
        }

    }).catch((error)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong!");
        return false;
    });


}




//UpdateTask
export function UpdateTaskRequest(ID,Status,updateStatus){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/updateTaskStatus/"+ID+"/"+updateStatus;

    return axios.get(URL, AxiosHeader).then((res)=>{

        store.dispatch(HideLoader());

        if(res.status==200){


            SuccessToast("Status Updated");
            selectTaskByStatusRequest(Status);
            return true;


        }else{

            ErrorToast("Something Went Wrong!");
            return  false;
        }

    }).catch((error)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong!");
        return false;
    });


}



//SelectTask// Task Summary
export function selectProfileDetailsRequest(){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/selectProfileDetails";


    return axios.get(URL, AxiosHeader).then((res)=>{

        store.dispatch(HideLoader());

        if(res.status==200){

            let myJsonData = res.data['data'][0];
            store.dispatch(SetProfile(myJsonData));

        }else{

            ErrorToast("Something Went Wrong");
            return  false;
        }

    }).catch((error)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    });


}




//ProfileUpdate
export function ProfileUpdateRequest(Email,FirstName,LastName,Mobile,Password,Photo){

    store.dispatch(ShowLoader())

    let URL=BaseURL+"/profileUpdate";

    let PostBody={
        email:Email,
        firstName:FirstName,
        lastName:LastName,
        mobile:Mobile,
        password:Password,
        photo:Photo
    }

    let UserDetails={email:Email,firstName:FirstName,lastName:LastName,mobile:Mobile,photo:Photo}

    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{

        store.dispatch(HideLoader())
        if(res.status===200){

            SuccessToast("Profile Update Success")
            setUserDetails(UserDetails)

            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err)=>{

        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    });
}




// Recover Password Step 01 Send OTP
export function RecoverVerifyEmailRequest(email){

    store.dispatch(ShowLoader());

    let URL=BaseURL+"/RecoverVerifyEmail/"+email;

    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader());

        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast("Couldn't find your Email Address!");
                return false;
            }
            else{
                //setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address.");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong")
        return false;
    });
}




// Recover Password Step 02 Verify OTP
export function RecoverVerifyOTPRequest(email,OTP){

    store.dispatch(ShowLoader())

    let URL=BaseURL+"/RecoverVerifyOTP/"+email+"/"+OTP;

    return axios.get(URL).then((res)=>{

        store.dispatch(HideLoader())

        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast("Invalid Verification Code!");
                return false;
            }
            else{
                //setEmail(email)
                SuccessToast("OTP Verification Successful");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{

        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    });
}



// Recover Password Step 03 Reset Password
export function RecoverResetPasswordRequest(Email,OTP,Password){

    //alert(Email+OTP+Password);

    store.dispatch(ShowLoader())

    let URL=BaseURL+"/RecoverResetPassword";
    let PostBody = {email:Email,OTP:OTP,password:Password};

    return axios.post(URL,PostBody).then((res)=>{

        store.dispatch(HideLoader())

        if(res.status===200){

            if(res.data['status']==="fail"){

                ErrorToast("Password Update Fail");
                return false;
            }
            else{

                SuccessToast("New Password Created");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{

        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    });
}






//Ip_AddressInsert
export function VisitorInsertRequest(IP_Address,City,CountryName,State){

   // store.dispatch(ShowLoader());

    let URL = BaseURL+"/insertVisitor";

    let PostBody={
        ip_address:IP_Address,
        city:City,
        country_name:CountryName,
        state:State
    }

    return axios.post(URL,PostBody).then((res)=>{

       // store.dispatch(HideLoader());

        if(res.status === 200) {

            //SuccessToast("IP Address Saved Succeess");

        }
        else{
            //ErrorToast("Something Went Wrong");
        }

    }).catch((error)=>{

        //store.dispatch(HideLoader());
        //ErrorToast("Something Went Wrong")
        return false;
    });

}











//SignUpEmailVerify--SendOTP--Step-01
export function SignUpVerifyEmailRequest(Email){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/SignUpEmailVerify/"+Email;

    return axios.get(URL).then((res)=>{

        store.dispatch(HideLoader());

        if(res.status === 200){

            if(res.data['status'] === "fail"){

                if(res.data['data'] === "EmailAlreadyExist"){

                    ErrorToast("Email Already Exist");
                    return false;

                }
                else{

                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{

                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;

            }
        }
        else{
            ErrorToast("Something Went Wrong");
        }

    }).catch((error)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong")
        return false;
    });

}




//DataInsert//SignUp-Step-02//VerifyOTP
export function SignUpVerifyOTPRequest(Email,FirstName,LastName,Mobile,Password,Photo,OTP){

    store.dispatch(ShowLoader());

    let URL = BaseURL+"/SignUpVerifyOTP/"+Email+"/"+OTP;

    let PostBody={
        email: Email,
        firstName: FirstName,
        lastName: LastName,
        mobile: Mobile,
        password: Password,
        photo:Photo

    }

    return axios.post(URL,PostBody).then((res)=>{

        store.dispatch(HideLoader());

        if(res.status === 200) {

            if(res.data['status'] === "fail"){

                if(res.data['data'] === "InvalidOTPCode"){

                    ErrorToast("Invalid Verification Code");
                    return false;

                }
                else{

                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{

                SuccessToast("Sign Up Success ");
                return true;

            }
        }
        else{
            ErrorToast("Something Went Wrong");
        }

    }).catch((error)=>{

        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong")
        return false;
    });

}


