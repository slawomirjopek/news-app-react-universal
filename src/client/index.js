import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../shared/App";
import { Provider } from "react-redux";
import configureStore from "../shared/redux/store";

const store = configureStore(window.__initialData__);

render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById("app")
);