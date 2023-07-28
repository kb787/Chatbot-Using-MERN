var mongoose = require('mongoose') ;

var imageResponseSchema = mongoose.Schema(
    {
        imageResponse :
        {
            type:Object 
        } 
    }
)

if(mongoose.models['imageresponses'])
{
    mongoose.model('imageresponses') ;
}

var imageResponseModel = mongoose.model('imageresponses', imageResponseSchema) ;
module.exports = imageResponseModel ;