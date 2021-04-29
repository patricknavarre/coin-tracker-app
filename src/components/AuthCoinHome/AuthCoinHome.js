import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";

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
import { AuthContext } from '../context/AuthContext';

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: 350,
      },
    },
  }));


function AuthCoinHome() {

    const classes = useStyles();

    const { dispatch } = useContext(AuthContext);

    const [search, setSearch] = useState("")

    useEffect(() => {
        
        
    })




    return (
        <Grid container spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "30vh" }}
        >
        <InputLabel htmlFor="component-search">Search</InputLabel>
            <Input
              id="component-search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e)}
            />
       <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
      
      </Grid>
    )
}

export default AuthCoinHome;
