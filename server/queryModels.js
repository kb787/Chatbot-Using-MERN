var mongoose = require('mongoose') ;

var querySchema = mongoose.Schema(
    {
        prompt :
        {
            type:String ,
            required:true ,
        }
    }
)

if(mongoose.models['queries'])
{
    return mongoose.model('queries') ;
}

var queryModel = mongoose.model('queries', querySchema) ;
module.exports = queryModel ;