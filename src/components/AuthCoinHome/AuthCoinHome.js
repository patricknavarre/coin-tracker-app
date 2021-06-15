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
  Select,
} from "@material-ui/core";
import MuiAlert from "@material-ui//lab/Alert";
import Spinner from "../Spinner/Spinner";
import { CenterFocusStrong } from "@material-ui/icons";

// will load files from the .env file
require('dotenv').config();

const API_KEY = process.env.API_KEY

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
  const [searchArray, setSearchArray] = useState([]);
  const [dropdownMenu, setDropdownMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getInitialCryptoData();
  }, []);

  async function getInitialCryptoData() {
    setIsLoading(true);

    try {
      const result = await axios.get(
        `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=30&tsym=USD&apiKey=${API_KEY}`
      );
      const crytoData = result.data.Data;
      setInitialSearchArray(crytoData);
      setDropdownMenu(crytoData);
      setSearchArray(crytoData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }
  function showCryptoData() {
    return searchArray.map((item, index) => {
      return (
        <Grid item xs={4} key={index}>
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
  function selectCoinOnChange(e) {
    setSearchInput(e.target.value);
    console.log(e.target.value);
    let selectedCoin = initialSearchArray.filter(
      (item) => e.target.value === item.CoinInfo.FullName
    );
    console.log(selectedCoin);
    setSearchArray(selectedCoin);
  }
  function showAllCoins() {
    // console.log("=-===");
    setSearchArray(initialSearchArray);
  }
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <Button variant="outlined" onClick={showAllCoins}>
          Show all coins
        </Button>
      </div>
      <Grid
        item
        xs={12}
        container
        spacing={4}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ marginTop: "10px" }}
      >
        <InputLabel htmlFor="age-native-simple">Select Coin</InputLabel>
        <Select
          native
          value={searchInput}
          onChange={selectCoinOnChange}
          inputProps={{
            name: "age",
            id: "age-native-simple",
          }}
        >
          {dropdownMenu.map((item) => {
            return (
              <option
                value={item.CoinInfo.FullName}
                key={item.CoinInfo.FullName}
              >
                {item.CoinInfo.FullName}
              </option>
            );
          })}
        </Select>
        <Grid
          item
          xs={12}
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
    </div>
  );
}
export default AuthCoinHome;