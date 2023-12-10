import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigateTo = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formData,setFormData] = useState({username:"",email:"",password:"",confirmPassword:""});
  const [apiCall,setApiCall] = useState({isApiCallInitiated:false});
  
  const handleFormInput=(event)=>{
    setFormData((prevFormData)=>{return {...prevFormData,[event.target.name]:event.target.value}});
  }
  const register = async (formData) => {
    try{
      
      const url = 'localhost:8080/register';
      // eslint-disable-next-line
      let response = await axios.post(url,{
        username: formData.username,
        password: formData.password,
      });
      // console.log(response);
      enqueueSnackbar("Registered successfully",{variant:"success"});
      setApiCall((prevApiCall)=>{
        return {...prevApiCall,isApiCallInitiated:false};
      });
      setFormData({username:"",email:"",password:"",confirmPassword:""});
      navigateTo("/login",{from:"/register"});
    }catch(err){
      
       if(err.response && err.response.data){
        // console.log(err.response);
        enqueueSnackbar(err.response.data.message,{variant:"error"}); 
      }else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"});
      }
      
      setApiCall((prevApiCall)=>{
        return {...prevApiCall,isApiCallInitiated:false};
      });
    }
    
    
  };
  const validateInput = (data) => {
    if(data.username===""){
      enqueueSnackbar("Usename is a required field",{variant:"error"});
    }else if(data.email===""){
        enqueueSnackbar("Email is a required field",{variant:"error"});
    }else if(data.username.length<6){
      enqueueSnackbar("Username must be at least 6 characters",{variant:"error"});
    }else if(data.password===""){
      enqueueSnackbar("Password is a required field",{variant:"error"});
    }else if(data.password.length<6){
      enqueueSnackbar("Password must be at least 6 characters",{variant:"error"});
    }else if(data.password!==data.confirmPassword){
      enqueueSnackbar("Passwords do not match",{variant:"error"});
    }else{
      setApiCall((prevApiCall)=>{
        return {...prevApiCall,isApiCallInitiated:true};
      });
      register(data);
    }
  };

  return (
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   justifyContent="space-between"
    //   minHeight="100vh"
    // >
      
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleFormInput}
            fullWidth
          />
          <TextField
            id="email"
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormInput}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value = {formData.password}
            onChange={handleFormInput}
          />
          
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleFormInput}
            fullWidth
          />
          {  apiCall.isApiCallInitiated?
              <Box textAlign="center"><CircularProgress/></Box>:
              <Button className="button" variant="contained" onClick={(event)=>{
                event.preventDefault();
                validateInput(formData)
              }}>
                Register Now
              </Button>
            
          }
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login">
              Login here
             </Link>
          </p>
          
        </Stack>
      </Box>
      
    // </Box>
  );
};

export default Register;
