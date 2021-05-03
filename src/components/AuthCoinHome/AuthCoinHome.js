import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
import Spinner from "../Spinner/Spinner";
import { CenterFocusStrong } from "@material-ui/icons";
const API_KEY =
  "aa75e637f49f24f3346532322541fcf387f2092fff5040e37036a222edc9cba0";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(1),
  },
}));
function AuthCoinHome() {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [initialSearchArray, setInitialSearchArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getInitialCryptoData();
  }, []);
  async function getInitialCryptoData() {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=40&tsym=USD&apiKey=${API_KEY}`
      );
      const crytoData = result.data.Data;
      setInitialSearchArray(crytoData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }
  // function handleSearchCoinInputClick (event) {
  //   console.log(101);
  //   console.log(coinSearchInput);
  //   if (coinSearchInput.length === 0) {
  //     setSearch({
  //       isError: true,
  //       errorMessage: "Sorry, please enter a coin",
  //       coinSearchInput: "",
  //     });
  //     return;
  //   }
  //   ({
  //     isLoading: true,
  //   });
  //   try {
  //     const result = {
    // https://min-api.cryptocompare.com/data/price?fsym=${searchInput}&tsyms=USD,JPY,EUR
  //       },
  //     };
  //     let payload = await axios.request(result);
  //     setSearchInput({  
  //       coinArray: payload.data.data,
  //       isLoading: false,
  //       coinInput: "",
  //     });
  //     console.log(payload.data.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  function handleOnSearchInput (e) {
    // e.preventDefault();
    // console.log(e)

  }

  function showCryptoData() {
    return initialSearchArray.map((item) => {
      console.log(item);
      return (
        <Grid item xs={4}>
          <img
            src={`https://www.cryptocompare.com/${item.CoinInfo.ImageUrl}`}
          />
          <h1>Coin Name: {item.CoinInfo.FullName}</h1>
          <h2>Name: {item.CoinInfo.Internal}</h2>
          <h2>Price: {item.DISPLAY.USD.PRICE}</h2>
          <h2>Day High: {item.DISPLAY.USD.HIGH24HOUR}</h2>
          <h2>Day Low: {item.DISPLAY.USD.LOW24HOUR}</h2>
        </Grid>
      );
    });
  }
  return (
    <Grid item xs={12}
    container
    spacing={4}
    direction="row"
    alignItems="center"
    justify="center"
    style={{marginTop: "10px" }}>
     <InputLabel style={{marginTop: "10px" }} htmlFor="component-searchInput">Search</InputLabel>
      <Input
        style={{ marginTop: "10px" }}
        id="component-searchInput"
        name="search"
        value={searchInput}
        onChange={(e) => handleOnSearchInput(e)}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
     
    <Grid item xs={12}
      container
      spacing={4}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: "30vh" }}
    >
     
      {isLoading ? <Spinner /> : showCryptoData()}
    </Grid>

    </Grid>
  );
}
export default AuthCoinHome;