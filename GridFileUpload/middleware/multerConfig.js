const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' +  req.file.originalname);
  },
});

const uploads = multer({ storage: storage });
// upload file path
module.exports = uploads;
