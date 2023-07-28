var mongoose = require('mongoose') ;

var userSchema  = mongoose.Schema(
    {
         userName :
         {
             type:String ,
             required:true 
         }  ,

         userEmail :
         {
            type:String ,
            required:true   
         }   ,

         userPassword :
         {
             type:String ,
             required:true 
         }
    }
)

if(mongoose.models['users'])
{
     return mongoose.model('users') ;
}

var userModel = mongoose.model('users', userSchema) ;
module.exports = userModel ;