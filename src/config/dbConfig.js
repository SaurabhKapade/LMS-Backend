const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

async function connectDB(){
    try{
        await mongoose.connect(serverConfig.DB_URL)
        console.log('connected to Database')
    }catch(error){
        console.log('cant connect to database');
        console.log(error)
    }
}
module.exports = connectDB