import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { deepOrange } from "@material-ui/core/colors";
import { blueGrey } from "@material-ui/core/colors";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import MainRouter from "./MainRouter";
import Spinner from './components/Spinner/Spinner';
import AuthContextComponent from "./components/context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      // main: deepOrange["A200"],
      main: blueGrey["700"],
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFF5EE",
      contrastText: "black",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <AuthContextComponent>
    <ThemeProvider theme={theme}>
    <React.Suspense fallback={<Spinner/>}>
      <Router>
      <ToastContainer />
      <MainRouter />
      </Router>
    </React.Suspense>
    </ThemeProvider>
    </AuthContextComponent>
  );
}

export default App;