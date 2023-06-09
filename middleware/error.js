const Errorhandler = require('../utills/errorHandler')

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

//wrong mongo db error
 if(err.name === "CastError"){
       const message = `Resource not found ${err.path}`
        err= new Errorhandler(message,400)
   }
   //MongoDB Duplicate Error
   if(err.code === 11000){
    const message =  `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new Errorhandler(message,400)
   }

    res.status(err.statusCode).json({
       success: false,
       message: err.message,
    });
}
