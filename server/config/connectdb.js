import mongoose from "mongoose"

const connectDB=async()=>{

    try {
    const conn = await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log(`MONGODB CONNECT : ${conn.connection.host}`)


    } catch (error) {
        console.log(`ERROR----> ${error}`)
        process.exit()
    }
}


export default connectDB