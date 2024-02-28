import { Box, Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface loginData{
    email:string
    password:string
    isApproved: true
}

const Login:React.FC  = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<loginData>()


      


      const onSubmit: SubmitHandler<loginData>= async (data)=>{
        try {
          const response = await axios.post("https://crewfare-admin.dedicateddevelopers.us/api/user/signin", data)
      console.log("User created:", response.data);
  } catch (error) {
      console.error("Error creating user:", error);
  }
    console.log(data);}

  return (
    <Paper sx={{ width: "50%", height: "500px", margin: " 50px auto", background: "lightblue" }}>
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField type="email" {...register('email',{required: true})} placeholder="Enter Your Email Id"/>
        {
            errors.email && <samp>Email is required</samp>
        }
        <TextField type="password" {...register('password',{required: true})} placeholder="Enter Your Password"/>
        {
            errors.email && <samp>Password is required</samp>
        }
        <Button type="submit">Submit</Button>
        <Link href="/forgetpassword"><Button>Forget Password</Button></Link>
        <Link href="/resetpassword"><Button>Reset Password</Button></Link>
    </Box>
    </Paper>
    
  )

}
export default Login
