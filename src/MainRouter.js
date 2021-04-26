import React from 'react';
import { Switch , Route } from 'react-router-dom';

import Home from "./components/Home/Home";

function MainRouter () {
    return (
        <>
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
        </>
    )
}

export default MainRouter;