import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import AuthContextComponent, { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  const { dispatch, state } = useContext(AuthContext);

  const handleUserLogout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  };

  console.log(state);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Coin Tracker
          </Typography>

          <NavLink
            to="/login"
            exact
            className="nav-link"
            activeClassName="active-nav-link"
          >
            <Button color="inherit">
              {/* {state.isAuth ? state.user.email : "Login"} */}
              {state.isAuth ? state.user.email : "Login"}
            </Button>
          </NavLink>

          {state.isAuth ? (
            <NavLink
              to="/sign-up"
              exact
              className="nav-link"
              activeClassName="active-nav-link"
            >
              {" "}
              <Button onClick={handleUserLogout} color="inherit">
                Logout
              </Button>{" "}
            </NavLink>
          ) : (
            <NavLink
              to="/sign-up"
              exact
              className="nav-link"
              activeClassName="active-nav-link"
            >
              {" "}
              <Button color="inherit">Signup</Button>{" "}
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
