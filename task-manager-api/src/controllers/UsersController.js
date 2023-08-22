const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");
const RegOTPModel = require("../models/RegOTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");
const TasksModel = require("../models/TasksModel");




exports.registration = (req,res)=>{

    let reqBody = req.body;

    UsersModel.create(reqBody,(error,data)=>{

        if(error){

            res.status(200).json({status:"fail", data:error});

        }else{
			
            res.status(200).json({status:"success", data:data});
            //res.status(200).json(data);
        }
    })
}



//UserLogin
exports.login=(req,res)=>{

    let reqBody=req.body;

   UsersModel.aggregate([

        {$match:reqBody},
        {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}

    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            if(data.length>0){

                let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), data:data[0]['email']}
                let token = jwt.sign( Payload,'SecretKey123456789');
                res.status(200).json({status:"success",token:token,data:data[0]})

            }
            else {
                res.status(200).json({status:"UserNotFound"})
            }
        }
    })
}



//ProfileUpdate
exports.profileUpdate=(req,res)=>{

    let email= req.headers['email'];
    let reqBody=req.body;

    UsersModel.updateOne({email:email},reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })

}



//SelectProfileDetails
exports.selectProfileDetails=(req,res)=>{

    let email= req.headers['email'];

    UsersModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
            //res.status(200).json(data);
        }
    })
}






// Recover Password Step 01 Send OTP
exports.RecoverVerifyEmail = async(req,res)=>{

     let Email = req.params.email;
     let OTPCode = Math.floor(100000 + Math.random() * 900000)


    try{

        //Email Account Query
        let UserCount = await UsersModel.aggregate([ {$match:{email:Email}}, {$count:"total"} ]);

        if(UserCount.length>0){

            // OTP Insert
            let CreateOTP = await OTPModel.create({email: Email, otp: OTPCode})
            // Email Send
            let SendEmail = await SendEmailUtility(Email,"Your PIN Code is= "+OTPCode,"Task Manager PIN Verification")
            res.status(200).json({status: "success", data: SendEmail})
        }
        else{

            res.status(200).json({status: "fail", data: "No User Found"})
        }



    }
    catch(error){

        res.status(200).json({status: "fail", data: error})
    }




}





// Recover Password Step 02 Verify OTP
exports.RecoverVerifyOTP = async (req,res)=>{

    let Email = req.params.email;
    let OTPCode = req.params.otp;
    let Status =0;
    let StatusUpdate=1;


     try{

         //OTP Verify Query
         let OTPCount = await OTPModel.aggregate([ {$match: {email: Email,otp: OTPCode,status: Status}}, {$count: "total"} ]);

         if(OTPCount.length>0){

             let OTPUpdate = await OTPModel.updateOne({
                 email: Email,
                 otp: OTPCode,
                 status: Status
             }, {status: StatusUpdate});

             res.status(200).json({status: "success", data: OTPUpdate})

         }
         else{

             res.status(200).json({status: "fail", data: "Invalid OTP Code"})

         }

     }
     catch (error){

         res.status(200).json({status: "fail", data: error});
     }


}






// Recover Password Step 03 Reset Password
exports.RecoverResetPassword = async (req,res)=> {

    let Email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPassword = req.body['password'];
    let StatusUpdate=1;

    try{

        //OTPUsed Query
        let OTPUsedCount = await OTPModel.aggregate([ {$match: {email: Email,otp: OTPCode,status: StatusUpdate}}, {$count: "total"} ]);

        if(OTPUsedCount.length>0){

            let PasswordUpdate = await UsersModel.updateOne({email: Email}, {password: NewPassword});

            res.status(200).json({status: "success", data: PasswordUpdate})

        }
        else{

            res.status(200).json({status: "fail", data: "Password Update Fail"})

        }

    }
    catch (error){

        res.status(200).json({status: "fail", data: error});
    }



}



//OTPStatusUpdate
exports.OTPStatusUpdate = async (req,res)=>{

   let StatusCount = await OTPModel.aggregate([{$match:{status:0}}, {$count: "total"}]);

     try{
         if(StatusCount.length>0){


             let otpStatusUpdate = await OTPModel.updateMany({
                 status:0
             }, {status:1});


             res.status(200).json({status: "success", data:otpStatusUpdate})
         }
         else{
             res.status(200).json({status: "fail", data:"status 0 Not Found"})
         }
     }
     catch (e) {

         res.status(200).json({status: "fail", data: e});
     }
}











//SignUpUser Email Verify--Step-01//OTP-Send
exports.SignUpEmailVerify = async (req,res)=>{

    let Email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)

    let UserCount = await UsersModel.aggregate([{$match:{email:Email}}, {$count: "total"} ]);


        try{

             if(UserCount.length === 0){

                // OTP Insert
                let CreateOTP = await RegOTPModel.create({email: Email, otp: OTPCode})
                // Email Send
               let SendEmail = await SendEmailUtility(Email, "Your Verification Code is= " + OTPCode, "Task Manager PIN Verification");

                 res.status(200).json({status: "success", data: SendEmail})

                 //res.status(200).json({status: "success", data: "User New"})

              }
              else{

                res.status(200).json({status: "fail", data: "EmailAlreadyExist"})

              }

        }
        catch(error){

            res.status(200).json({status: "fail", data: error});

       }


}





//SignUp//SignUpVerifyOTP--Step-02--DataInsert-
exports.SignUpVerifyOTP = async (req,res)=>{

    let Email = req.params.email;
    let OTPCode = req.params.otp;
    let Status =0;
    let StatusUpdate=1;
    let reqBody = req.body;



    try{

        //OTP Verify Query
        let OTPCount = await RegOTPModel.aggregate([ {$match: {email: Email,otp: OTPCode,status: Status}}, {$count: "total"} ]);

        if(OTPCount.length>0){

            let OTPUpdate = await RegOTPModel.updateOne({
                email: Email,
                otp: OTPCode,
                status: Status
            }, {status: StatusUpdate});


            let SignUpData = await UsersModel.create(reqBody);

            res.status(200).json({status: "success", data: SignUpData })
            

        }
        else{

            res.status(200).json({status: "fail", data: "InvalidOTPCode"})

        }

    }
    catch (error){

        res.status(200).json({status: "fail", data: error});
    }




}





