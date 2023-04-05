const multer = require('multer');
const fs = require('fs');

const uploads= multer({
  storage : multer.diskStorage({
    destination : function(req , file ,cb){
      cb(null , "public/uploads")
    },
    filename: (req, file, cb) => {
      console.log(`file.originalname::`, file.originalname);
      let mineType = file.originalname.split('.');
      mineType = mineType[mineType.length - 1];
  
      var filename = req.params.id.replace(/\s/g, '_');
      cb(null, filename + '.' + mineType);
    }
  })
})
// upload file path
module.exports = uploads;
