const mongoose = require('mongoose')

const fileUploadSchema = mongoose.Schema({

    file : {
        type:String,
        require :[true,"Please Select File"]
    }
})

const fileUploadModel = mongoose.model('fileUpload',fileUploadSchema)

module.exports = fileUploadModel