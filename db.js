import mongoose  from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const URL = process.env.AtlasDb

mongoose.connect(URL)

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

