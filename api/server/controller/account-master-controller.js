const AccountMasterService = require('../services/account-master')
const AccountMaster = require('../model/account-master')

const status = require('http-status')
const APIResponse = require('../helpers/APIResponse')
const jwt = require("jsonwebtoken");

class AccountMasterController {
    async createAccount(req, res) {
        try {
            
            AccountMasterService.createAccount(req.body).then((data) => {

                return res.status(status.OK).json(new APIResponse("Accountmaster created successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create Accountmaster", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create Accountmaster", true, 500, error.message))
        }
    }
    async loginAccount(req, res) {
        try {
            AccountMasterService.loginAccount(req.body.user_name,req.body.password).then((data) => {
            
                if (data) {
                  
                    const accessToken = jwt.sign({ user_name: data.username}, process.env.APP_TOKEN_SECRET);
            
                    return res.status(status.OK).json(new APIResponse("account login successfully", false, 200, accessToken))

                } else {
                    return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Username or password incorrect", true, 500, error.message))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while login account", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while login account", true, 500, error.message))
        }
    }

    async getAllAccount(req, res) {
        try {
            AccountMasterService.getAllAccount().then((data) => {
                if (data) {
                    return res.status(status.OK).json(new APIResponse("Accountmaster list get successfully", false, 200, data))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("Accountmaster not found", true, 404, data))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get Accountmaster", true, 500, error.message))
            })
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get Accountmaster", true, 500, error.message))
        }
    }

    async getAccountById(req, res) {
        try {
            AccountMasterService.getAccountById(req.params.id).then((data) => {
                if (data) {
                    return res.status(status.OK).json(new APIResponse("Accountmaster get successfully", false, 200, data))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("Accountmaster not found", true, 404, data))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get Accountmaster", true, 500, error.message))
            })
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get Accountmaster", true, 500, error.message))
        }
    }

    async updateAccount(req, res) {
        try {
            AccountMasterService.updateAccount(req.params.id, req.body).then((data) => {
               
                
               
                return res.status(status.OK).json(new APIResponse("Accountmaster updated successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update Accountmaster", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update Accountmaster", true, 500, error.message))
        }
    }

    async deleteAccount(req, res) {
        try {

            AccountMasterService.deleteAccount(req.params.id).then((data) => {
                return res.status(status.OK).json(new APIResponse("Accountmaster delete successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete Accountmaster", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete Accountmaster", true, 500, error.message))
        }
    }
}

module.exports = new AccountMasterController()