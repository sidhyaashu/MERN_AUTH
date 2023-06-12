// =====================================ALL IMPORTS=====================================

import dotenv from "dotenv"
import express from "express";
const app = express()
import connectDB from './config/connectdb.js'
import morgan from 'morgan'
// Enable corse policyy
import cors from "cors"
import mongoose from 'mongoose'
import userRoutes from './routes/userR.js'


dotenv.config()
connectDB()



app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


//Loade Routes
app.use('/api/user',userRoutes)


mongoose.connection.once('open',()=>(
    app.listen(process.env.PORT,()=>console.log(`Server listening on PORT ${process.env.PORT}`))
))

