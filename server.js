import express from 'express'
import path from 'path'
import { dirname } from 'node:path';
import DB from './db.js'
import { fileURLToPath } from 'node:url';
import userRoutes from './routes/user.js'
import relativeRoutes from './routes/relative.js';
import dotenv from 'dotenv'
dotenv.config()
const app = express()

const PORT = process.env.PORT||3000

app.use(express.json())
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use('/home', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send('Home page') 
    console.log("home page is hit")
})

app.use('/user',userRoutes)
app.use('/relative', relativeRoutes)

app.listen(PORT, () => {
    console.log("server is listening")
})
