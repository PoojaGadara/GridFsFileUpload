const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({

    eventTitle:{
        type:String,
        //require : [true , "Please Enter Event Title"]
    },
    eventUrl:{
        type: String,
     //   require : [true , "Please Enter Event URL"]
    },
    eventDate:{
        type:Date,
      //  require : [true ,"Please Enter Date"]
    },
    fromTime:{
        type:String,
        //require:[true , "Please Enter Time when event will start"]
    },
    toTime:{
        type:String,
       // require:[true , "Please Enter Time to event will end"]
    },
    aboutEvent:{
        type:String,
       // require:[true , "Please Enter About Event"]
    },
    eventSpeaker:[{
        name:{
            type:String,
            //require:[true, "Please enter Name of Speaker"]
        },
        description:{
            type:String
        },
        image:{
            type:String
        }
    }],
    eventModirator:[{
        name:{
            type:String,
            require:[true, "Please enter Name of Speaker"]
        },
        description:{
            type:String
        },
        image :  {
            type: String
        }
    }],
    userData : {
        type:String,
    },
    userData : {
        file : String,
    },
    
    joiningInfo:{
        type:String
    },
    organizedBy:[{
        type:String
    }],
    tags:[{
        type:String
    }],
    created:{
        type:Date,
        default :Date.now()
    },
    updated:{
        type:Date,
        default :Date.now()
    },
    deleted:{
        type:Date,
        default :Date.now()
    }
})

const eventModel = mongoose.model('event',eventSchema)

module.exports = eventModel