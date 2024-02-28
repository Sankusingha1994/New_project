
import { Box, Button, Paper, TextField } from "@mui/material"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    fullName: string
    email: string
    password: string
  }

const signup:React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
     

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post("https://crewfare-admin.dedicateddevelopers.us/api/user/signup", data)
            console.log("form Data",response.data);
            
        } catch (error) {
            console.log("error message", error);

            
        }
      }
  return (

    <Paper sx={{ width: "50%", height: "500px", margin: " 50px auto", background: "lightblue" }}>
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
       
        <TextField type="text" {...register('fullName',{required: true})} placeholder="Enter Your Full Name"/>
        {
            errors.fullName && <samp>Fullname is required</samp>
        }
        <TextField type="email" {...register('email',{required: true})} placeholder="Enter Your Email Id"/>
        {
            errors.email && <samp>Email is required</samp>
        }
        <TextField type="password" {...register('password',{required: true})} placeholder="Enter Your Password"/>
        {
            errors.email && <samp>Password is required</samp>
        }
        <Button type="submit">Submit</Button>
    </Box>
    </Paper>
  )
}

export default signup
