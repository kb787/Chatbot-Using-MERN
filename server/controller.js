var userModel = require('./userModels') ;
var queryModel = require('./queryModels');


const handleRegister = async(req,res) => 
{
    const {userName, userEmail , userPassword} = req.body ;
    try 
    {
        var prevUser = await userModel.findOne({
              userEmail : req.body.userEmail  
        }) 

        console.log(prevUser) ;
        if(prevUser)
        {
            return res.status(500).send({message:"Already a user exists",success:false}) ;
        }
        else 
        {
             var newUser = await new userModel({
                userName , userEmail , userPassword
             }) ;
             console.log(newUser) ;
             newUser.save() ;
             return res.status(201).send({message:"Registration successfull",success:true,newUser}) ;
        }
    }
    catch(error)
    {
        console.log(error) ;
        return res.status(400).send({message:"Unable to connect to database ", success:false}) ;
    }
}

const handleLogin = async(req,res) => 
{
    try 
    {
        var prevResponse = await userModel.findOne({
            userEmail:req.body.userEmail 
        }) 
        console.log(prevResponse) ;
        if(prevResponse.userEmail !== req.body.userEmail)
        {
             return res.status(500).send({message:"Invalid email address", success:false}) ; 
        }
        else if(prevResponse.userPassword !== req.body.userPassword)
        {
             return res.status(500).send({message:"Invalid email address or false", success:false}) ;
        }
        else 
        {
             return res.status(201).send({message:"Logged in successfully", success:true}) ;
        }
    }
    catch(error)
    {
        return res.status(400).send({message:"Server side occured",success:false}) ;
    }
}

var express = require('express') ;
var userRouter = express.Router() ;
userRouter.post("/postRegister", handleRegister) ;
userRouter.post("/postLogin", handleLogin) ;

module.exports = userRouter ;