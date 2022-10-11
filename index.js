"use strict";

var express = require('express');
var bodyParser = require('body-parser');
const APIResponse = require('./api/server/helpers/APIResponse');
const httpStatus = require('http-status');
var database = require("./database");
const cors = require('cors');
const path = require('path');
const axios = require("axios");

const { Mongoose } = require('mongoose');
const connectDB = require('./database');
const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

});

var port = process.env.port || 3000
app.listen(port, () => {
    console.log("Server running on port", port);
});

connectDB();

function setupRoutes() {
    const routes = require("./routes");
    routes.setup(app);
}

setupRoutes();
module.exports = app;