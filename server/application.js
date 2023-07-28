var express = require('express') ;
var app = express() ;
var http = require('http') ;
var server = http.createServer(app) ;
var Connect = require('./configure') ;
var userRouter = require('./controller') ;
var morgan = require('morgan') ;
var cors = require('cors') ;
var textRouter = require('./textQueryController');
var voiceRouter = require('./voiceQueryController') ;
var imageRouter = require('./imageController') ;
var corsOptions = {
    origin:"http://localhost:3000" ,
}

app.use(express.json()) ;
app.use(morgan('dev')) ;
app.use(cors(corsOptions)) ;

Connect() ;
app.get("/" , (req,res) => 
{
     res.send(" Your application is running ") ;
}
)
app.use("/v1/api/users", userRouter) ;
app.use("/v2/api/queryresponses", textRouter) ;
app.use("/v3/api/voiceresponses",voiceRouter) ;
app.use("/v4/api/imageresponses",imageRouter) ;
server.listen(3500 , () => 
   {
      console.log(" Application started ") ;
   }
)