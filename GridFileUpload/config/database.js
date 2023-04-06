const mongoose = require('mongoose')

const DataBaseConnection = () => {
    mongoose.connect(process.env.DATABASE,{
        useUnifiedTopology:true,
        useNewUrlParser: true,
    }).then((data) => {
        console.log(`mongoDB connect with host:${data.connection.host}`)
    })
}

module.exports = DataBaseConnection