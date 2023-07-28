var mongoose = require('mongoose') ;

var voiceResponseSchema = mongoose.Schema(
       {
            voiceResponse :
            {
                type:String ,
            }
       }
)

if(mongoose.models['voiceresponses'])
{
    return mongoose.model('voiceresponses') ;
}

var voiceResponseModel = mongoose.model('voiceresponses',voiceResponseSchema) ;
module.exports = voiceResponseModel ;