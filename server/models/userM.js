import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    tc:{
        type:Boolean,
        required:true
    },

},{timestamps:true})

const User = mongoose.model('User',userSchema)
export default User