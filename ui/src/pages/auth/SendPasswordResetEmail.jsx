import {useState} from 'react'
import { 
    TextField,
    Button,
    Box,
    Alert,
    Grid
 } from "@mui/material";

const SendPasswordResetEmail = () => {

    const [error,setError] = useState({
        status:false,
        msg:"",
        type:""
    })



    const handleSubmit =(e)=>{
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData={
            email:data.get('email'),
        }

        if(actualData.email){
            console.log(actualData)
            document.getElementById('password-reset-form').reset()
            setError({
                status:true,
                msg:"Password reset email sent. Check Your email",
                type:"success"
            })

            // setTimeout(()=>{
            //     navigate('/')
            // },1000)
            
        }else{
            setError({
                status:true,
                msg:"Enter a valid email",
                type:"error"
            })
        }

    }
  return (
    <>
    <Grid container justifyContent='center' >
        <Grid item sm={6} sx={12} >
            <Box component='form' noValidate id='password-reset-form' sx={{mt:2}} onSubmit={handleSubmit} >
                <TextField required fullWidth sx={{mt:1}}  id='email' name='email' label='Email Address' />
                <Box textAlign='center' >
                    <Button type="password" sx={{mt:3,mb:2,px:5}} variant='contained' >Send Email</Button>
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

export default SendPasswordResetEmail
