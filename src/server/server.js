import Express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router, matchPath } from "react-router-dom";
import App from "../shared/App";
import fs from "fs";
import path from "path";

const app = new Express();
/* server settings & middlewares */
app.use(Express.static("public"));

/* data api */
app.get("/api/news", (req, res) => {
    res.json(getApiData("news"));
});

/* get all requests without /api/ */
app.get(/^((?!\/api\/)[\s\S])*$/, (req, res) => {
    let status = 200;
    const context = {};

    const markup = renderToString(
        <Router location={req.url} context={context}>
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

const getApiData = (endpoint) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, `api/${endpoint}.json`), "utf8"));
};