require('dotenv').config({ path: "../config/config.env" });
const multer = require('multer')
const mongoose = require('mongoose')
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage
const Grid = require('gridfs-stream')
const crypto = require('crypto')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const express = require('express');
const { route } = require('../app');
const router = express.Router();

const app = express();
//Middleware
app.use(bodyParser.json())
app.use(methodOverride('_method')) 

const url = 'mongodb+srv://mongo:co1on3on58k87KBH@cluster0.3vetls5.mongodb.net/Company'

const connection = mongoose.createConnection('mongodb+srv://mongo:co1on3on58k87KBH@cluster0.3vetls5.mongodb.net/Company' ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let gfs;

connection.once('open', () => {
    //Intialize Stream
    gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
})
console.log(gfs)
const storage = new GridFsStorage({

    url: 'mongodb+srv://mongo:co1on3on58k87KBH@cluster0.3vetls5.mongodb.net/Company',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

  module.exports = upload
  

   

  