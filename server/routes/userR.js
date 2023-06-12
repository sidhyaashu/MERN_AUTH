import express from 'express'
const router = express.Router()
import UserController from '../controllers/userC.js'
import checkUserrAuth from "../middleware/authMiddleware.js"


//Route levale middleware -- To protected route
router.use("/changepassword",checkUserrAuth)
router.use("/loggeduser",checkUserrAuth)



//Public Route
router.post('/register',UserController.userRegistration) // register User
router.post('/login',UserController.userLogin) // login User
router.post('/send-reset-password-email',UserController.sendUserPasswordResetEmail) // send-reset-password-email
router.post('/reset-password/:id/:token',UserController.userPasswordReset) // user password resset



//Protected Route
router.post('/changepassword',UserController.changeUserPassword) // change User password
router.get('/loggeduser',UserController.loggedUser) // logged user details




export default router