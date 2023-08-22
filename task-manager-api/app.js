//Basic Import
const express = require('express');
const app = new express();
const router = require('./src/routes/api');
const bodyParser = require('body-parser');
//const path = require('path');




//Security Middleware Import
const rateLimit = require('express-rate-limit');
const helemet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database Library Import
const mongoose = require('mongoose');
//Front-end Tagging
//app.use(express.static('client-side/build'));


//Security Middleware Implementation
app.use(cors())
app.use(helemet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors())

//RequestBodySizeIncrease
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Body Parser Implementation
app.use(bodyParser.json());



//Request Rate Limit Implementation
const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000,   //15 Minutes
    max: 3000   //Limit each IP to 100 requests per windowMs
})
app.use(Limiter);



//MongoDB(mongoose) Atlas Database Connection
let uri = "mongodb+srv://<username>:<password>@cluster0.m7fozzp.mongodb.net/TaskManager?retryWrites=true&w=majority";
let option = {user:'mymongodb715', pass:'85035785mongodb',autoIndex:true};


mongoose.connect(uri,option, (error)=>{
    console.log("Connection Success");
    console.log(error);
});




//Managing Front-end Routing
//app.use(express.static('client-side/build'));
/*app.get('*', function(req,res){
    res.sendFile(path.resolve(__dirname,'client-side','build','index.html'));

});*/




//Managing Back-end Routing// Back-end Routing Implementation
app.use('/api/v1', router);



//Undefined Route
app.use('*',(req,res)=>{

    res.status(404).json({status:"Fail", data:"Not Found"});
});


module.exports=app;