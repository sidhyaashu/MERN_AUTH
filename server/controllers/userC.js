import User from '../models/userM.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'


class UserController{



    /*=========================================== REGISTER USER===========================================  */
    static userRegistration = async(req,res)=>{
        const { name,email,password,confirm_password,tc} = req.body

        const user = await User.findOne({email:email})
        if(user){
            res.send({
                "status":"failed",
                "message":"User already exist"
            })
        }else{
            if(name && email && password && confirm_password && tc){
                if(password === confirm_password){

                    try {
                        const hashedPassword = await bcrypt.hash(password ,10)

                        const doc = new User({
                            name:name,
                            email:email,
                            password:hashedPassword,
                            tc:tc
                        })
                        await doc.save()

                        //JWT Token
                        const saved_user = await User.findOne({email:email})
                        const token = jwt.sign({userId:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

                        res.status(201).json({"message":"User Registered succesfully",doc,"token":token})
                    } catch (error) {
                        res.send({
                        "status":"failed",
                        "message":"Unable to register",
                        error
                        })
                    }

                }else{
                    res.send({
                    "status":"failed",
                    "message":"password and confirm password dosen't match!"
                    })
                }

            }else{
                res.send({
                "status":"failed",
                "message":"All feilds are required!"
                })
            }

        }
    }







    /*=========================================== LOGIN USER===========================================  */

    static userLogin = async(req,res)=>{
        try {

            const { email ,password} = req.body
            if(email && password){
                const user = await User.findOne({email:email})
                if(user != null){
                    const isMatched = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatched){

                        //JWT TOKEN
                        const token =  jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'20d'})


                        res.status(200).send({
                            "status":"Success",
                            "message":"Login Successfully",
                            email,
                            "token":token
                        })

                    }else{
                        res.send({
                        "status":"failed",
                        "message":"Email or password is not valid"
                        })
                    }

                }else{
                    res.send({
                    "status":"failed",
                    "message":"You are not registered!"
                    })
                }

            }else{
                res.send({
                "status":"failed",
                "message":"All feilds are required!"
                })
            }
            
        } catch (error) {
            res.send({
            "status":"failed",
            "message":"Unable to register",
            error
            })
        }
    }






    /*=========================================== CHANGE PASSWORD ===========================================  */

    static changeUserPassword = async (req,res)=>{
        const { password , confirm_password } = req.body
        if(password && confirm_password){
            if(password === confirm_password){
                const newHashedPassword = await bcrypt.hash(password,10)


                await User.findByIdAndUpdate(req.user._id,{
                    $set:{
                        password:newHashedPassword
                    }
                })

                res.send({
                    "status":"success",
                    "message":"Change password"
                    })


            }else{
                res.send({
                    "status":"failed",
                    "message":"password and confirm password dosen't match!"
                    })
            }

        }else{
            res.send({
                "status":"failed",
                "message":"All feilds are required!"
                })
        }
    }





    /*=========================================== LOGGED USER ===========================================  */
    static loggedUser =async(req,res)=>{
        res.send({"user":req.user})
    }




    /*=========================================== FORGET PASSWORD ===========================================  */
    static sendUserPasswordResetEmail = async(req,res)=>{
        const { email } = req.body
        if(email){
            const user = await User.findOne({email:email})
            if(user){
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({userId:user._id},secret,{expiresIn:'15m'})
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`



                //send Email
                let info = await transporter.sendMail({
                    from:process.env.EMAIL_FORM,

                    
                    to:user.email,
                    subject:"Sidhya - Password reset Link",
                    html:`<a href=${link}>Click Here</a> to reset your password`
                })

                res.send({"status":"success","message":"go your email",info})

            }else{
                res.send({
                "status":"failed",
                "message":"Email dose not exist!"
                })
            }

        }else{
            res.send({
                "status":"failed",
                "message":"Email feild required!"
                })
        }
    }
    /*=========================================== RESET PASSWORD ===========================================  */
    static userPasswordReset = async(req,res)=>{
        const { password , confirm_password }= req.body
        const { id , token } = req.params
        const user = await User.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token,new_secret)
            if(password && confirm_password){
                if(password === confirm_password){
                    const newHashedPassword = await bcrypt.hash(password,10)
                    await User.findByIdAndUpdate(user._id,{
                        $set:{
                            password:newHashedPassword
                        }
                    })
                    res.send({"status":"success","message":"Password reset succesfully"})
                }else{
                    res.send({
                    "status":"failed",
                    "message":"password and confirm password dosen't match!"
                    })
                }

            }else{
                res.send({
                "status":"failed",
                "message":"All feilds are required!"
                })
            }
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Invalid Token"})
        }

    }






    /*=========================================== LOGOUT ===========================================  */



}

export default UserController