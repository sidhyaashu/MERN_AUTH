import {useState} from 'react'
import { 
    TextField,
    Button,
    Box,
    Alert
 } from "@mui/material";
import { NavLink ,useNavigate} from 'react-router-dom';



 
 const UserLogin = () => {
    const [error,setError] = useState({
        status:false,
        msg:"",
        type:""
    })

    const navigate = useNavigate()


    const handleSubmit =(e)=>{
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData={
            email:data.get('email'),
            password:data.get('password')
        }

        if(actualData.email && actualData.password){
            console.log(actualData)
            document.getElementById('login-form').reset()
            setError({
                status:true,
                msg:"Login success",
                type:"success"
            })

            setTimeout(()=>{
                navigate('/dashboard')
            },1000)

        }else{
            setError({
                status:true,
                msg:"All feilds are required",
                type:"error"
            })
        }

    }

   return (
     <>
      <Box component='form' noValidate id='login-form' sx={{mt:2}} onSubmit={handleSubmit} >
        <TextField required fullWidth sx={{mt:1}}  id='email' name='email' label='Email Address' />
        <TextField required fullWidth  sx={{mt:1}} id='password' name='password' label='Password' type='password' />
        <Box textAlign='center' >
            <Button type="password" sx={{mt:3,mb:2,px:5}} variant='contained' >Login</Button>
        </Box>
        <NavLink to='/send-password-reset-email'  >Forget password</NavLink>
        {
            error.status ? <Alert sx={{my:5}} severity={error.type} >{error.msg}</Alert>:""
        }
      </Box>
     </>
   )
 }
 
 export default UserLogin
 