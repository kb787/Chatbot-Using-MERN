var mongoose = require('mongoose') ;

var responseSchema = mongoose.Schema(
    {
        queryResponse :
        {
            type:String ,
        }
    }
)

if(mongoose.models['queryresponses'])
{
    return mongoose.model('queryresponses') ;
}

var responseModel = mongoose.model('queryresponses', responseSchema) ;
module.exports = responseModel ;