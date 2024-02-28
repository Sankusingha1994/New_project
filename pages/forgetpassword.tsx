import { Box, Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';


interface forgetpassworddata{
email: string
}

const forgetpassword:React.FC = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<forgetpassworddata>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const onSubmit:SubmitHandler<forgetpassworddata> = async (data) => {
    try {
      const response = await axios.post('https://crewfare-admin.dedicateddevelopers.us/api/user/forgot-password', data);
      setSuccessMessage(response.data);
    } catch (error:any) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
     <Paper>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField type="email" {...register('email', { required: true })} placeholder="Email" />
        {errors.email && <span>Email is required</span>}
        <Button type="submit">Submit</Button>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </Box>
     </Paper>
      
    );
  };
  
  

export default forgetpassword






