const InvoiceMasterService = require('../services/invoice-master')
const AccountMasterService=require("../services/account-master")
const invoiceentryService = require('../services/invoice-entry')
const status = require('http-status')
const APIResponse = require('../helpers/APIResponse')

class InvoiceMasterController {
    async createInvoice(req, res) {
        try {
            var account_id=await AccountMasterService.getAccountById(req.body.account_id)
            if(!account_id)
            {
                return res.status(status.BAD_REQUEST).json(new APIResponse("account id not found", false, 400))
            }
            InvoiceMasterService.createInvoice(req.body).then((data) => {
                return res.status(status.OK).json(new APIResponse("invoice created successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create invoice", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create invoice", true, 500, error.message))
        }
    }

    async getAllInvoice(req, res) {
        try {
            InvoiceMasterService.getAllInvoice().then((data) => {
                if (data) {
                    return res.status(status.OK).json(new APIResponse("invoice list get successfully", false, 200, data))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("invoice not found", true, 404, data))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get invoice", true, 500, error.message))
            })
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get invoice", true, 500, error.message))
        }
    }

    async getInvoiceById(req, res) {
        try {
            InvoiceMasterService.getInvoiceById(req.params.id).then((data) => {
                if (data) {
                    return res.status(status.OK).json(new APIResponse("invoice get successfully", false, 200, data))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("invoice not found", true, 404, data))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get invoice", true, 500, error.message))
            })
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get invoice", true, 500, error.message))
        }
    }

    async updateInvoice(req, res) {
        try {
            InvoiceMasterService.updateInvoice(req.params.id, req.body).then((data) => {
                return res.status(status.OK).json(new APIResponse("invoice updated successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update invoice", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update invoice", true, 500, error.message))
        }
    }

    async deleteInvoice(req, res) {
        try {

            let data = await invoiceentryService.findByInvoiceId(req.params.id)
            if (data) {
                return res.status(status.OK).json(new APIResponse("fist delete in invoiceenteris", false, 400, data))
            }
            await InvoiceMasterService.deleteInvoice(req.params.id).then((data) => {
                return res.status(status.OK).json(new APIResponse("invoice delete successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete invoice", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete invoice", true, 500, error.message))
        }
    }
}

module.exports = new InvoiceMasterController()