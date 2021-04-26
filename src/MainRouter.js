import React from 'react';
import { Switch , Route } from 'react-router-dom';

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function MainRouter () {
    return (
        <>
        <Navbar />
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
        </>
    )
}

export default MainRouter;