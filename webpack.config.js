const path = require("path");

const browserConfig = {
    entry: path.join(__dirname, "src/client/index.js"),
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: "babel-loader"
                }]
            }
        ]
    }
};

const serverConfig = {
    entry: path.join(__dirname, "src/server/server.js"),
    target: "node",
    output: {
        path: path.join(__dirname, "public"),
        filename: "server.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: "babel-loader"
                }]
            }
        ]
    }
};

module.exports = [browserConfig, serverConfig];