import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigateTo = useNavigate();
  // eslint-disable-next-line
  const { enqueueSnackbar } = useSnackbar();
  const [formData,setFormData] = useState({username:"",password:""});
  const [isApiCallInitiated,setIsApiCallInitiated] = useState(false);
  

  const login = async (formData) => {
    const validateIn = validateInput(formData);
    if(validateIn){
        try{
          const url = 'localhost:3030/login';
         // eslint-disable-next-line
          let response = await axios.post(url,{
            username: formData.username,
            password: formData.password,
          });
          // console.log(response);
          persistLogin(response.data.token,response.data.username);
          enqueueSnackbar("Logged in successfully",{variant:"success"});
          setIsApiCallInitiated(false);
          setFormData({username:"",password:""});
          navigateTo("/",{from:"/register"});
        } catch(err){
          if(err.response && err.response.data){
            // console.log(err.response);
            enqueueSnackbar(err.response.data.message,{variant:"error"}); 
          }else{
            enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"});
          }
          setIsApiCallInitiated(false);
        }     
    }
  };


  let handleFormInput=(event)=>{
    setFormData((prevFormData)=>{
      return {...prevFormData,[event.target.name]:event.target.value};
    });

  };

  
  
  const validateInput = (data) => {
    if(data.username===""){
      enqueueSnackbar("Username is a required field",{variant:"error"});
      return false;
    }else if(data.password===""){
      enqueueSnackbar("Password is a required field",{variant:"error"});
      return false;
    }else{
      setIsApiCallInitiated(true);
      return true;
    }
  };

  
  
  const persistLogin = (token, username) => {
    localStorage.setItem("token",token);
    localStorage.setItem("username",username);
    

  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      
      <Box className="content">
        <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
        <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={handleFormInput}
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            title="Username"
            name="password"
            placeholder="Enter Username"
            fullWidth
            value={formData.password}
            onChange={handleFormInput}
            type="password"
          />
           {  isApiCallInitiated?
              <Box textAlign="center"><CircularProgress/></Box>:
          <Button className="button" variant="contained" onClick={(e)=>{
              e.preventDefault();
              login(formData);
            }}>
            LOGIN
          </Button>
          }
          <p className="secondary-action">
             Don’t have an account?{" "}
             <Link className="link" to="/">
               Register now
             </Link>
          </p>
        </Stack>
      </Box>
      
    </Box>
  );
};

export default Login;
