import jwt from 'jsonwebtoken'
import User from "../models/userM.js"

var checkUserrAuth = async(req,res,next)=>{
    let token
    const { authorization } = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1]

            //Verify token
            const { userId } = jwt.verify(token,process.env.JWT_SECRET_KEY)

            //Get User From Token
            req.user = await User.findById(userId).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({
                "status":"failed",
                "message":"Unauthorized user ....!"
            })
        }
    }

    if(!token){
        res.status(401).send({"message":"Unauthorized User : No Token"})
    }
}

export default checkUserrAuth