import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useCookies} from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context';
 import { useContext } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.


 
export default function SignIn() {
  const context=useContext(Context);
  const [cookies, setCookies] =useCookies(["access"]);
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   try {
    console.log(data.get("password"));
    const response =await axios.post("https://twitter-nackend-git-main-harshprateek39.vercel.app/api/v1/auth/login", {
      email:data.get("email"),
      password:data.get("password")
   });
   if(response.data.message){  alert(response.data.message);  return;}
    console.log(response.data.message);
   setCookies("access",response?.data?.token);
   context.setCurrentUser(response.data.userID);
   window.localStorage.setItem("userID",response?.data?.userID);
   window.localStorage.setItem("userDetail",JSON.stringify(response?.data?.userDetail));
  navigate('/');

   } catch (error) {
    
    console.log("login Error",error);
   }
  };

  return (
    
      <Container component="main" maxWidth="sm"  className=' rounded-lg bg-white'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
  
  );
}