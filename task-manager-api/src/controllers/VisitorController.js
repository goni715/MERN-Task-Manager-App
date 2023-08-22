const VisitorModel = require("../models/VisitorModel");

exports.insertVisitor = (req,res)=>{

    let reqBody = req.body;

    VisitorModel.create(reqBody,(error,data)=>{

        if(error){

            res.status(200).json({status:"fail", data:error});

        }else{

            res.status(200).json({status:"success", data:data});
            //res.status(200).json(data);
        }
    })
}