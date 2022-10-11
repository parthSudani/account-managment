"use strict";

var config = require("./config");
var status = require('http-status')
const APIResponse = require('./api/server/helpers/APIResponse')
const jwt = require('jsonwebtoken')


function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.APP_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Invalid token.", true, 500))
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(status.BAD_REQUEST).json(new APIResponse("Token not provided.", true, 400))
    }
};


exports.setup = (app) => {

    var jwt = require("express-jwt");

    app.use('/api/ams/', authenticateJWT, (req, res, next) => {
        next();
    })
    var account = require("./api/server/routes/account-master");
    var invoiceentry=require("./api/server/routes/invoice-entry");
    var invoicemaster=require("./api/server/routes/invoice-master");
    var partymaster=require("./api/server/routes/party-master");
    var productmaster=require("./api/server/routes/product-master");
    var YearMasters=require("./api/server/routes/year-master");
    

    app.use("/api/auth/account/", account);
    app.use('/api/ams/party/', partymaster);
    app.use('/api/ams/product/', productmaster)
    app.use('/api/ams/invoiceentry/', invoiceentry)
    app.use('/api/ams/year/', YearMasters)
    app.use('/api/ams/invoice/', invoicemaster)
};

module.exports = exports;