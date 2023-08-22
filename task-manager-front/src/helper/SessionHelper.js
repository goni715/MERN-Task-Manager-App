

class SessionHelper {


     setToken(MyToken){
         localStorage.setItem("token", MyToken);
     }

    getToken(){
       return localStorage.getItem("token");
    }


   setUserDetails(userDetails){
       localStorage.setItem("UserDetails", JSON.stringify(userDetails));
   }

    getUserDetails(){
       return JSON.parse(localStorage.getItem("UserDetails"));
    }


    setEmail(MyEmail){
        localStorage.setItem("email", MyEmail);
    }

    getEmail(){
        return localStorage.getItem("email");
    }

    setOTP(OTP){
        localStorage.setItem("OTP", OTP);
    }

    getOTP(){
        return localStorage.getItem("OTP");
    }




    removeSessions(){
         localStorage.clear();

         window.location.href="/";
    }






    setRegEmail(MyEmail){
        localStorage.setItem("regEmail", MyEmail);
    }

    getRegEmail(){
        return localStorage.getItem("regEmail");
    }


    setFirstName(fName){
        localStorage.setItem("FirstName", fName);
    }

    getFirstName(){
        return localStorage.getItem("FirstName");
    }



    setLastName(lName){
        localStorage.setItem("LastName", lName);
    }

    getLastName(){
        return localStorage.getItem("LastName");
    }



    setMobile(mobile){
        localStorage.setItem("Mobile", mobile);
    }

    getMobile(){
        return localStorage.getItem("Mobile");
    }


    setPassword(password){
        localStorage.setItem("Password", password);
    }

    getPassword(){
        return localStorage.getItem("Password");
    }


    setPhoto(photo){
        localStorage.setItem("Photo", photo);
    }

    getPhoto(){
        return localStorage.getItem("Photo");
    }



}

export const {
    setToken,
    getToken,
    setUserDetails,
    getUserDetails,
    removeSessions,
    setEmail,
    getEmail,
    setOTP,
    getOTP,
    setRegEmail,
    getRegEmail,
    setFirstName,
    getFirstName,
    setLastName,
    getLastName,
    setMobile,
    getMobile,
    setPassword,
    getPassword,
    setPhoto,
    getPhoto



} = new SessionHelper();