import mongoose  from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const URL = process.env.AtlasDb

mongoose.connect(URL,{

    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,  
    serverSelectionTimeoutMS: 5000,

}).catch(err => console.log(err));

const DB =mongoose.connection

DB.on('connected',()=>{
console.log("database is connected")


})

DB.on('disconnected',()=>{
console.log("database is disconnected")


})

DB.on('error',()=>{
console.log("error in connecting")


})
export default DB

