import {useState} from 'react'
import { 
    TextField,
    Button,
    Box,
    Alert,
    FormControlLabel,
    Checkbox,
 } from "@mui/material";
import { useNavigate} from 'react-router-dom';

const UserRegistration = () => {
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
            name:data.get('name'),
            email:data.get('email'),
            password:data.get('password'),
            confirm_password:data.get('confirm_password'),
            tc:data.get('tc')
        }

        if(actualData.email && actualData.tc !== null && actualData.password && actualData.name && actualData.confirm_password ){
            if(actualData.password === actualData.confirm_password){
                console.log(actualData)
                document.getElementById('registration-form').reset()
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
       <Box component='form' noValidate id='registration-form' sx={{mt:2}} onSubmit={handleSubmit} >
        <TextField required fullWidth sx={{mt:1}}  id='name' name='name' label='Name' />
        <TextField required fullWidth sx={{mt:1}}  id='email' name='email' label='Email Address' />
        <TextField required fullWidth  sx={{mt:1}} id='password' name='password' label='Password' type='password' />
        <TextField required fullWidth  sx={{mt:1}} id='confirm_password' name='confirm_password' label='Confirm password' type='password' />
        <FormControlLabel control={<Checkbox value='agree' />} color='primary' name='tc' id='tc' label="I agree to term and condition" />
        <Box textAlign='center' >
            <Button type="password" sx={{mt:3,mb:2,px:5}} variant='contained' >Register</Button>
        </Box>
        {
            error.status ? <Alert sx={{my:5}} severity={error.type} >{error.msg}</Alert>:""
        }
      </Box>
    </>
  )
}

export default UserRegistration
