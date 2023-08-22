const  mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
    ip_address:{type:String},
    city:{type:String},
    country_name:{type:String},
    state:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});

const VisitorModel=mongoose.model('visitors',DataSchema);
module.exports=VisitorModel