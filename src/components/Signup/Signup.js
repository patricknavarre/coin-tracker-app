import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import jwtDecode from "jwt-decode"
import { toast } from 'react-toastify';
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../context/AuthContext";

import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  CircularProgress,
  Snackbar,
  Grid,
} from "@material-ui/core";

import MuiAlert from "@material-ui//lab/Alert";

import useInputHooks from "../hooks/useInputHooks";

import useEmailHooks from "../hooks/useEmailHooks";

import usePasswordHooks from "../hooks/usePasswordHooks";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 350,
    },
  },
}));

function Signup() {
  const classes = useStyles();

  //   const [email, setEmail] = useState("");

  //   const [userName, setUserName] = useState("");
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");

  //   const [password, setPassword] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [
      email, 
      setEmail, 
      inputEmailError, 
      errorEmailMessage
    ] = useEmailHooks();

  const [
    userName,
    setUserName,
    inputUserNameError,
    errorUserNameMessage,
  ] = useInputHooks();

  const [
    firstName,
    setFirstName,
    inputFirstNameError,
    errorFirstNameMessage,
  ] = useInputHooks();

  const [
    lastName,
    setLastName,
    inputLastNameError,
    errorLastNameMessage,
  ] = useInputHooks();

  const [
    password,
    setPassword,
    inputPasswordError,
    errorPasswordMessage,
  ] = usePasswordHooks();

  const { dispatch } = useContext(AuthContext);


  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    console.log(email);
    console.log(userName);
    console.log(firstName);
    console.log(lastName);
    console.log(password);
    try {
        let payload = await axios.post("http://localhost:3001/users/sign-up", {
            email,
            userName,
            firstName,
            lastName,
            password,
        });
        toast.success("Welcome to the club!  Please go Login!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
        console.log(payload);
    } catch(e) {
        console.log(e);
    }  
  }

  useEffect(() => {
    if (
      inputUserNameError === false &&
      inputFirstNameError === false &&
      inputLastNameError === false &&
      inputEmailError === false &&
      inputPasswordError === false
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
      return;
    }
    if (
      userName.length === 0 ||
      firstName.length === 0 ||
      email.length === 0 ||
      lastName.length === 0 ||
      password.length === 0
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [userName, email, firstName, lastName, password]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "30vh" }}
    >
      <Grid item xs={12}>
        <form
          className={classes.root}
          autoComplete="on"
          onSubmit={handleSignupSubmit}
        >
          <FormControl error={inputEmailError}>
            <InputLabel htmlFor="component-email">Email</InputLabel>
            <Input
              id="component-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e)}
            />
            <FormHelperText id="component-error-text">
              {inputEmailError && errorEmailMessage}
            </FormHelperText>
          </FormControl>
          <br />
          <FormControl error={inputUserNameError}>
            <InputLabel htmlFor="component-userName">User Name</InputLabel>
            <Input
              id="component-userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e)}
            />
            <FormHelperText id="component-error-text">
              {inputUserNameError && errorUserNameMessage}
            </FormHelperText>
          </FormControl>
          <br />
          <FormControl error={inputFirstNameError}>
            <InputLabel htmlFor="component-firstName">First Name</InputLabel>
            <Input
              id="component-firstName"
              name="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e)}
            />
            <FormHelperText id="component-error-text">
              {inputFirstNameError && errorFirstNameMessage}
            </FormHelperText>
          </FormControl>
          <br />
          <FormControl error={null}>
            <InputLabel htmlFor="component-lastName">Last Name</InputLabel>
            <Input
              id="component-lastName"
              name="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e)}
            />
            <FormHelperText id="component-error-text">
              {inputLastNameError && errorLastNameMessage}
            </FormHelperText>
          </FormControl>

          <br />
          <FormControl error={inputPasswordError}>
            <InputLabel htmlFor="component-password">Password</InputLabel>
            <Input
              type="password"
              id="component-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e)}
            />
            <FormHelperText id="component-error-text">
              {inputPasswordError && errorPasswordMessage}
            </FormHelperText>
          </FormControl>

          <br />
          <Button variant="contained" color="primary" type="submit" disabled={isButtonDisabled}>
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default Signup;
