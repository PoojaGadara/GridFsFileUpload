const eventController= require('../Controller/eventController')

const express = require('express');
const mongoose = require('mongoose');
const upload = require('../middleware/multerGridFs');
const uploads  = require('../middleware/multerConfig')
const router = express.Router();

router.post('/upload',upload.single('file'),eventController.uploadFiles)



//create Event
router.post('/create/event',uploads.array('image',3),eventController.createEvent)
//Update Event
router.put('/event/:id',uploads.array('image',3),eventController.updateEvent)
//Get Event
router.get('/event/:id',eventController.getEvent)
//Delete Event
router.delete('/event/:id',eventController.deleteEvent)
//Get All Event
router.get('/events',eventController.getAllEvent)


//create event speaker

router.post('/create/speaker',eventController.createSpeaker)


router.post('/new/file',uploads.single('file'),eventController.uploadFile)
router.get('/files' ,eventController.getFiles )

module.exports = router; 