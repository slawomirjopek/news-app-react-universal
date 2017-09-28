import Express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import App from "../shared/App";

const app = new Express();
/* server settings & middlewares */
app.use(Express.static("public"));

/* get all requests */
app.get("*", (req, res) => {
    let status = 200;
    const markup = renderToString(
        <Router>
            <App/>
        </Router>
    );

    res.status(status).send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>News app (react universal (react + node.js + express))</title>
            </head>
            <body>
                <div id="app">${markup}</div>
                <script src="bundle.js"></script>
            </body>
        </html>
    `);
});

/* start server */
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`========== | Server stared on port: ${port} | ==========`);
});