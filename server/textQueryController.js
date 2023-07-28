var queryModel = require('./queryModels') ;
const NodeCache = require("node-cache");
var cache = new NodeCache()  ;
const dotenv = require("dotenv");
var responseModel = require('./responseModels') ;
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, 
});
const handleTextQuery = async(req,res) => 
{
    const {prompt} = req.body ;
    const {queryResponse} = req.body ;
    try {
        
      if (!prompt) {
        return res.status(400).send({
          message: "userQuery is undefined",
        });
      }
        var cachedResponse = cache.get(prompt) ;
        if(cachedResponse)
        {
           return res.status(200).json(cachedResponse) ;
        }
        var prevQuery = await new queryModel(
            {
                prompt
            }
        )
        console.log(prevQuery) ;
        prevQuery.save() ;
        var responseData  = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: ` ${prevQuery}`,
        });
        console.log(responseData.data) ;
        if (responseData) {
               responseData = await new responseModel(
                {
                       queryResponse
                } 
              )
            responseData.save() ;  
          if (responseData.prevQuery) {
            return res.status(201).json(responseData.queryResponse);
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(404).send({
          message: err.message,
        });
      }
}

const handleGetTextQuery = async(req,res) => 
{
     
     const {queryResponse} = req.body ;
     try 
     {
         var queryData = await responseModel.find(
             {
               queryResponse:req.body.queryResponse
             }  
         )
         console.log(queryData) ;
         return response.status(201).json(quryData) ; 
     }

     catch(error)
     {
        console.log(error) ;
        return res.status(404).send(error) ;
     }
}


var express = require('express') ;
var textRouter = express.Router() ;

textRouter.post("/postTextQuery",limiter,handleTextQuery) ;
textRouter.get("/getTextQuery",limiter,handleGetTextQuery) ;
module.exports = textRouter ;

