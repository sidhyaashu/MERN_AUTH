import { 
    Grid,
    TextField,
    Button,
    Box,
    Alert
 } from "@mui/material";

 import { useState } from 'react'
 import { useNavigate } from "react-router-dom";


const ResetPassword = () => {

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
            password:data.get('password'),
            confirm_password:data.get('confirm_password'),
        }

        if(actualData.password && actualData.confirm_password ){
            if(actualData.password === actualData.confirm_password){
                console.log(actualData)
                document.getElementById('reset-password-form').reset()
                setError({
                    status:true,
                    msg:"Login success",
                    type:"success"
                })

                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }else{
                setError({
                status:true,
                msg:"password and confirm password dosen't match",
                type:"error"
                })
            }
            
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

    <Grid container justifyContent='center' >
        <Grid item sm={6} sx={12} >
            <h2>Reset Your Password</h2>
            <Box component='form' noValidate id='reset-password-form' sx={{mt:2}} onSubmit={handleSubmit} >
                <TextField required fullWidth  sx={{mt:1}} id='password' name='password' label='New Password' type='password' />
                <TextField required fullWidth  sx={{mt:1}} id='confirm_password' name='confirm_password' label='New Confirm password' type='password' />
                <Box textAlign='center' >
                    <Button type="password" sx={{mt:3,mb:2,px:5}} variant='contained' >Reset Password</Button>
                </Box>
                {
                    error.status ? <Alert sx={{my:5}} severity={error.type} >{error.msg}</Alert>:""
                }
            </Box>
        </Grid>
    </Grid>
      
    </>
  )
}

export default ResetPassword
