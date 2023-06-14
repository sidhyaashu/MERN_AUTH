import { 
    Button,
    CssBaseline,
    Grid,
    Typography,
    Box
 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./auth/ChangePassword";


const Dashboard = () => {
    const handleLogOut = ()=>{
        console.log("Logout Clicked...")
        navigate('/login')
    }

    const navigate = useNavigate()

  return (
    <>
      <CssBaseline/>
      <Grid container>
        <Grid item sm={4} sx={{
            backgroundColor:'gray',
            p:5,
            color:"white",
            mt:5
        }}>
            <h2>Dashboard</h2>
            <Typography variant="h4">Email: sidhya@gmail.com</Typography>
            <Typography variant="h6" >Name: Asutosh sidhya</Typography>
            <Button variant="contained" sx={{mt:8}} color='warning' size='large' onClick={handleLogOut} >Logout</Button>

        </Grid>
        <Grid item sm={8} >
            <ChangePassword/>
        </Grid>

      </Grid>
    </>
  )
}

export default Dashboard
