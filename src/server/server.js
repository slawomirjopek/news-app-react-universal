import Express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router, matchPath } from "react-router-dom";
import App from "../shared/App";
import routes from "../shared/routes/routes";
import fs from "fs";
import path from "path";
import serialize from "serialize-javascript";

const app = new Express();
/* server settings & middlewares */
app.use(Express.static("public"));

/* data api */
app.get("/api/news", (req, res) => {
    getAllNews().then((data) => {
        res.json(data);
    });
});

app.get("/api/news/:id", (req, res) => {
    getSingleNews(req.params.id).then((data) => {
        res.json(data);
    });
});

/* get all requests without /api/ */
app.get(/^((?!\/api\/)[\s\S])*$/, (req, res) => {
    let status = 200;
    let context = {};

    const currentRoute = routes.find((route) => matchPath(req.url, route));
    const initialData = currentRoute.component.getInitialData && currentRoute.component.getInitialData();

    Promise.resolve(initialData).then((data) => {
        context = { data };

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
                    <script>window.__initialState__ = ${serialize(data)}</script>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        `);
    });
});

/* start server */
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`========== | Server stared on port: ${port} | ==========`);
});

const getData = (endpoint) => {
    return new Promise((resolve) => {
        fs.readFile(path.join(__dirname, `api/${endpoint}.json`), "utf8", function(err, data) {
            resolve(JSON.parse(data))
        });
    });
};

const getAllNews = () => getData("news");

const getSingleNews = (id) => {
    return getData("news").then((data) => data.find((news) => news.id == id ? news : null))
};