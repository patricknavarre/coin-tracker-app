import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Axios from "../lib/axios/Axios"

import { makeStyles } from "@material-ui/core/styles";

import  { AuthContext } from "../context/AuthContext";

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

import useEmailHooks from "../hooks/useEmailHooks";
import usePasswordHooks from "../hooks/usePasswordHooks";
import { checkIsUserLoggedIn } from "../lib/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 350,
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { dispatch } = useContext(AuthContext)


  const [
    email, 
    setEmail, 
    inputEmailError, 
    errorEmailMessage
  ] = useEmailHooks();

  const [
    password,
    setPassword,
    inputPasswordError,
    errorPasswordMessage,
  ] = usePasswordHooks();

  const handleLoginSubmit = async (e) => {

    // setUser({
    //   email: value,
    //   password: value,
    // })

    e.preventDefault();
    try {
      let payload = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });
      // console.log(payload);
      localStorage.setItem("jwtToken", payload.data.jwtToken);

      let decodedJwtToken = jwtDecode(payload.data.jwtToken);

      dispatch({ type: "LOGIN", user: decodedJwtToken.email })
      // console.log(decodedJwtToken);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {

    if (checkIsUserLoggedIn()) {
      let token = localStorage.getItem("jwtToken");

      let decodedJwtToken = jwtDecode(token);

      dispatch({ type: "LOGIN", user: decodedJwtToken.email })
      console.log("testingtesting")
    } else {
      props.history.push("/login");
      return
    }
    
    if (inputEmailError === false && inputPasswordError === false) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
      return;
    }
    if (email.length == 0 || password.length == 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
      
  }, [email, password]);

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
          onSubmit={handleLoginSubmit}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isButtonDisabled}
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default Login;
