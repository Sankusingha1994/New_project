import { Box, Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';


interface resetpassworddata{
    
        email: string,
        password: string,
        confirm_password: string
      
}

const ResetPasswordForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<resetpassworddata>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit:SubmitHandler<resetpassworddata>  = async (data) => {
    if (data.password !== data.confirm_password) {
      setError('confirm_password', { type: 'manual', message: 'Passwords do not match' });
      return;
    }

    try {
      const response = await axios.post('https://crewfare-admin.dedicateddevelopers.us/api/user/reset-password', data);
      setSuccessMessage(response.data.message);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Paper>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      
     <TextField type="email" {...register('email', { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}
      <TextField type="password" {...register('password', { required: true })} placeholder="Password" />
      {errors.password && <span>Password is required</span>}
      <TextField type="password" {...register('confirm_password', { required: true })} placeholder="Confirm Password" />
      {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
      <Button type="submit">Submit</Button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    
      </Box>
    </Paper>
    
  );
};

export default ResetPasswordForm;