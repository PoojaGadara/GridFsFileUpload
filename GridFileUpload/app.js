const express = require('express')
const app = express();
const errmiddleware = require('./middleware/error')
app.use(express.json())

//route imports
const event = require('./Routes/eventRoute')

app.use('/api',event)


//middleware for error

module.exports = app;