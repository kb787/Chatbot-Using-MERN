var mongoose = require('mongoose') ;
var colors = require('colors') ;

const Connect = () => 
{
    try  {
          mongoose.connect("mongodb+srv://KaranBhanushali:Kb19092003%40@cluster0.fpqcnoe.mongodb.net/gptCloneDatabase",
           {
           useNewUrlParser:true ,
           useUnifiedTopology:true
           }
        )
        console.log(`Successfully connected to database`.bgGreen) ;
    }
    catch(error)
    {
        console.log(`Unable to connect to database`.bgRed) ;
    }
}

module.exports = Connect ;