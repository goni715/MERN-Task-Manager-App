const express =require('express');
const UsersController = require("../controllers/UsersController");
const TasksController = require("../controllers/TasksController");
const VisitorController = require("../controllers/VisitorController");


const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const router = express.Router();



//This is HomePage
router.get('/', function(req,res){
    res.end('This is HomePage')
});



router.post('/registration',UsersController.registration);
router.post('/login',UsersController.login);
router.post('/profileUpdate',AuthVerifyMiddleware, UsersController.profileUpdate);
router.get('/selectProfileDetails',AuthVerifyMiddleware,UsersController.selectProfileDetails);



router.post('/createTask',AuthVerifyMiddleware,TasksController.createTask);
router.get('/deleteTask/:id',AuthVerifyMiddleware, TasksController.deleteTask);
router.get('/updateTaskStatus/:id/:status',AuthVerifyMiddleware, TasksController.updateTaskStatus);

router.get('/selectTaskByStatus/:status',AuthVerifyMiddleware,TasksController.selectTaskByStatus);
router.get('/taskStatusCount',AuthVerifyMiddleware,TasksController.taskStatusCount);



//InsertVisitor
router.post('/insertVisitor',VisitorController.insertVisitor);


router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPassword",UsersController.RecoverResetPassword);

router.get("/OTPStatusUpdate",UsersController.OTPStatusUpdate);



router.get('/SignUpEmailVerify/:email',UsersController.SignUpEmailVerify);
router.post('/SignUpVerifyOTP/:email/:otp',UsersController.SignUpVerifyOTP);



module.exports=router;