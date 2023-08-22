const  mongoose=require('mongoose');
const RegOTPSchema=mongoose.Schema({
    email:{type:String},
    otp:{type:String},
    status:{type:Number,default:0},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});
const RegOTPModel=mongoose.model('regOTPs',RegOTPSchema);
module.exports=RegOTPModel
