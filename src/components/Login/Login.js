import React from "react";
import axios from "axios";
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

import useEmailHooks from "../hooks/useEmailHooks";

import usePasswordHooks from "../hooks/usePasswordHooks";
import { SettingsInputSvideoRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 350,
    },
  },
}));

function Login() {
  const classes = useStyles();

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



//   const { dispatch } = useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
      e.preventDefault();

      try {

      }catch(e) {
          console.log(e);
      }
  }

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
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Grid>
  </Grid>
    )
}

export default Login;
