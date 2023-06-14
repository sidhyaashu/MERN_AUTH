import {useState} from 'react'

import { 
    Grid,
    Card,
    Typography,
    Tabs,
    Tab,
    Box
 } from "@mui/material";

import Pic1 from '../../images/pic1.png'
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';



const TabPanels = (props)=>{
    const { children,value,index } = props
    return(
        <div role="tabpanel" hidden={value !== index}>
            {
                value === index && (
                    <Box>{children}</Box>
                )
            }

        </div>
    )
}






const LoginRegs = () => {

    const [value, setvalue] = useState(0);
    const handleChange =(event,newValue)=>{
        setvalue(newValue)
    }


  return (
    <>
    <Grid container sx={{height:"90vh"}} >
        <Grid item lg={7} sm={5} sx={{
            backgroundImage:`url(${Pic1})`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            backgroundPosition:'center',
            display:{xs:'none',sm:'block'}
        }} >
        </Grid>

        <Grid item lg={5} sm={7} xs={12} >
            <Card sx={{width:"100%",height:"100%"}}>
                <Box sx={{mx:3}} >
                    <Box sx={{borderBottom:1,borderColor:'divider'}} >
                        <Tabs value={value} textColor="secondary" indicatorColor="secondary" onChange={handleChange} >
                            <Tab label='Login' sx={{textTransform:'none',fontWeight:'bold'}} >

                            </Tab>
                            <Tab  label='SignUp' sx={{textTransform:'none',fontWeight:'bold'}} >

                            </Tab>
                        </Tabs>
                    </Box>
                    <TabPanels value={value} index={0} ><UserLogin/></TabPanels>
                    <TabPanels value={value} index={1} ><UserRegistration/></TabPanels>
                </Box>
            </Card>
        </Grid>

    </Grid>
      
    </>
  )
}

export default LoginRegs
