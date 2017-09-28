import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes/routes";
import NoRoute from "./containers/NoRoute";

const App = () => {
    return (
        <Switch>
            {routes.map((route, index) => <Route key={index} {...route}/>)}
            <Route component={NoRoute}/>
        </Switch>
    );
};

export default App;
