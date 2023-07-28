var queryModel = require('./queryModels') ;
const NodeCache = require("node-cache");
var cache = new NodeCache()  ;
const dotenv = require("dotenv");
var imageResponseModel = require('./imageResponseModels') ;
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

const handleImageQuery = async(req,res) => 
{
    const {prompt} = req.body ;
    const {imageResponse} = req.body ;
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
        var responseData  = await openai.createImage({
          prompt: ` ${prompt}`,
          n:1 ,
        });
        console.log(responseData.data) ;
        var finalData = responseData.data.data[0] ;
        if (finalData) {
               finalData = await new imageResponseModel(
                {
                       imageResponse
                } 
              )
            finalData.save() ;  
          if (finalData.prevQuery) {
            return res.status(201).json(finalData.imageResponse);
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(404).send({
          message: err.message,
        });
      }
}

var express = require('express') ;
var imageRouter = express.Router() ;

imageRouter.post('/postImageQuery',handleImageQuery) ;
module.exports = imageRouter ;





