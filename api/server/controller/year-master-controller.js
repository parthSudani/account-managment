"use strict";
const YearMasterService = require('../services/year-master')
const invoiceentryService = require('../services/invoice-entry')
const status = require('http-status')
const APIResponse = require('../helpers/APIResponse')
const AccountMasterService=require('../services/account-master');

class YearMasterController {
        async createYear(req, res) {
                try {
                        var account_id=await AccountMasterService.getAccountById(req.body.account_id)
                        if(!account_id)
                        {
                            return res.status(status.BAD_REQUEST).json(new APIResponse("account id not found", false, 400))
                        }
                        YearMasterService.createYear(req.body).then((data) => {
                                return res.status(status.OK).json(new APIResponse("Year created successfully", false, 200, data))
                        }).catch((error) => {
                                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create year", true, 500, error.message))
                        })
                } catch (error) {
                        return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("not create year", true, 500, error.message))
                }
        }

        async getAllYear(req, res) {
                try {
                        YearMasterService.getAllYear().then((data) => {
                                if (data) {
                                    
                                        return res.status(status.OK).json(new APIResponse("year list get successfully", false, 200, data))
                                } else {
                                        return res.status(status.NOT_FOUND).json(new APIResponse("year not found", true, 404, data))
                                }
                        }).catch((error) => {
                                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get year", true, 500, error.message))
                        })
                } catch (e) {
                        return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get year", true, 500, error.message))
                }
        }

        async getYearById(req, res) {
                try {
                        YearMasterService.getYearById(req.params.id).then((data) => {
                                if (data) {
                                        return res.status(status.OK).json(new APIResponse("year get successfully", false, 200, data))
                                } else {
                                        return res.status(status.NOT_FOUND).json(new APIResponse("year not found", true, 404, data))
                                }
                        }).catch((error) => {
                                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get year", true, 500, error.message))
                        })
                } catch (e) {
                        return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get party", true, 500, error.message))
                }
        }

        async updateYear(req, res) {
                try {
                        YearMasterService.updateYear(req.params.id, req.body).then((data) => {
                                return res.status(status.OK).json(new APIResponse("year updated successfully", false, 200, data))
                        }).catch((error) => {
                                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update year", true, 500, error.message))
                        })
                } catch (error) {
                        return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update year", true, 500, error.message))
                }
        }

        async deleteYear(req, res) {
                try {
                        let data = await invoiceentryService.findYearById(req.params.id)
                        if (data) {
                                return res.status(status.OK).json(new APIResponse("first delete in invoice entry", false, 400, data))
                        }
                        await YearMasterService.deleteYear(req.params.id).then((data) => {
                                return res.status(status.OK).json(new APIResponse("year delete successfully", false, 200, data))
                        }).catch((error) => {
                                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete year", true, 500, error.message))
                        })
                } catch (error) {
                        return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete year", true, 500, error.message))
                }
        }
}

module.exports = new YearMasterController()