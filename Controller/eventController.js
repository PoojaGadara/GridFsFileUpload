const eventModel = require('../Models/eventModel')
const Errorhandler = require('../utills/errorHandler')
const catchAsyceError = require('../middleware/catchAsyncError')
const fileUploadModel = require('../Models/uplodeFile')
const app = require('express').Router()
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const fs = require('fs')
const path= require('path')

//Create Event
exports.createEvent = catchAsyceError(async (req, res, next) => {
    const event = await eventModel.create(req.body) 
    console.log(req.file)
    res.status(200).json({
        success: true,
        event
    })
})

// Upload Files In GridFs Storage
exports.uploadFiles = catchAsyceError(async (req, res, next) => {
    const file = req.file
    res.status(200).json({
        success: true,
        file
    })
})

// Get File From Grid FS Storage
exports.getFiles = catchAsyceError(async (req, res, next) => {

    const connection = mongoose.createConnection('mongodb+srv://mongo:co1on3on58k87KBH@cluster0.3vetls5.mongodb.net/Company', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    let gfs;

    connection.once('open', () => {
        //Intialize Stream
        gfs = Grid(connection.db, mongoose.mongo);
        gfs.collection('uploads');
    })

    console.log(gfs.collection('uploads'))
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files exist
        return res.json(files);
    });
});


// Upload File
exports.uploadFile = catchAsyceError(async (req, res, next) => {
    const file = req.file
    res.status(200).json({
        success: true,
        file
    })
})

//Event Operations 

//Create Event
exports.createEvent = catchAsyceError(async (req, res, next) => {
    const event = await eventModel.create(req.body)
    console.log(req.file)

    res.status(200).json({
        success: true,
        event
    })
})
//Update Event

exports.updateEvent= catchAsyceError(async (req,res,next) => {

    let event = await eventModel.findById(req.params.id)
    
    event = await eventModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        data : event
    })

    if(!event){
        return next(new Errorhandler("Event Not Found" , 404))
    }
});

//Delete Event
    exports.deleteEvent = catchAsyceError(async (req,res,next) => {

        const event = await eventModel.findByIdAndDelete(req.params.id)
        
        if(!event){
            return next(new Errorhandler("Event Not Found" , 404))
        }

        res.status(200).json({
            success:true,
            message : 'Event deleted Succesfully'
        })
    });

    exports.getEvent = catchAsyceError(async (req,res,next) => {

        const event = await eventModel.findById(req.params.id)
        
        if(!event){
            return next(new Errorhandler("Event Not Found" , 404))
        }

        res.status(200).json({
            success:true,
            event
        })
    });

    exports.getAllEvent= catchAsyceError(async (req,res,next) => {

        let event = await eventModel.find()
    
        res.status(200).json({
            success:true,
            data : event
        })
    
        if(!event){
            return next(new Errorhandler("Event Not Found" , 404))
        }
    });


//create event speaker 

exports.createSpeaker = catchAsyceError(async (req , res) => {
    const eventSpeaker = await eventModel.create({
        name:req.body.name,
        description:req.body.description,
        image: req.file.filename

    })
    eventSpeaker.save();
    
    res.status(200).json({
        success:true,
        data : eventSpeaker
    })
})