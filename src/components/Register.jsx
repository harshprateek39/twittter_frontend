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

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingIcons from 'react-loading-icons';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate =useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading,setLoading]=useState(false);
    const handleImageChange = (event) => {
      const file = event.target.files[0];
       setFileToBase(file)
    };

    const setFileToBase =(file)=>{
      const reader =new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend =()=>{
        setSelectedImage(reader.result);
      }
    }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const fdata = new FormData(event.currentTarget);
     try {
      const data= await axios.post('https://twitter-nackend-git-main-harshprateek39.vercel.app/api/v1/auth/register',{
        name: fdata.get('name'),
        email: fdata.get('email'),
        password: fdata.get('password'),
        image: selectedImage
      });
       toast.info("User Registered",{ position:'top-center'});
      
       setTimeout(() => {
         navigate('/login');
       }, 1000);
     } catch (error) {
     
       toast.error("Server Error",{ position:'top-center'});
        setSelectedImage(null);
        setTimeout(() => {
           navigate('/register');
        }, 1000);
     }
     finally{
      setLoading(false);
     }
  };  

  return (
    <ThemeProvider theme={defaultTheme}>
    <ToastContainer></ToastContainer>
    {loading&&<div className=' bg-black/50 fixed h-[100vh] w-[100vw] z-20 flex justify-center items-center backdrop-blur-sm top-0 left-0'>
      <LoadingIcons.BallTriangle></LoadingIcons.BallTriangle>
    </div>}
      <Container component="main" maxWidth="xs" className=' bg-white rounded-lg 
      '>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
               
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              <input type="file" accept="image/*" onChange={handleImageChange} ></input>
              {selectedImage && (
        <div>
          <h3>Selected Image:</h3>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
        </div>
      )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}