const invoiceentryService = require('../services/invoice-entry')
const status = require('http-status')
const InvoiceMasterService=require('../services/invoice-master');
const PartyMasterService=require('../services/party-master');
const ProductMasterService=require('../services/product-master');
const APIResponse = require('../helpers/APIResponse');
class invoiceentryController {
    async createinvoiceentry(req, res) {
        try {
            var invoice_id=await InvoiceMasterService.getInvoiceById(req.body.invoice_id)
            if(!invoice_id)
            {
                return res.status(status.BAD_REQUEST).json(new APIResponse("invoice id  not found", false, 400))
            }

            var party_id=await PartyMasterService.getPartyById(req.body.party_id)
            if(!party_id)
            {
                return res.status(status.BAD_REQUEST).json(new APIResponse("party id  not found", false, 400))
            }

            var product_id=await ProductMasterService.getProductById(req.body.product_id)
            if(!product_id)
            {
                return res.status(status.BAD_REQUEST).json(new APIResponse("product id  not found", false, 400))
            }

            

            invoiceentryService.createinvoiceentry(req.body).then((data) => {

                return res.status(status.OK).json(new APIResponse("invoice created successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create invoice", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create invoice", true, 500, error.message))
        }
    }

    async getAllinvoiceentry(req, res) {
        try {
            invoiceentryService.getAllinvoiceentry().then((data) => {
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


    async getinvoiceentryById(req, res) {
        try {
            invoiceentryService.getinvoiceentryById(req.params.id).then((data) => {
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

    async getmaxinvoice(req, res) {
        try {
            console.log("id====>", req.params.id)
            await invoiceentryService.getmaxinvoice(req.params.id).then((invoiceData) => {
                console.log("max id ====", invoiceData[0].max_invoice_no)

                let max  = invoiceData[0].max_invoice_no
                console.log("max id ====", max)


                if (max) {
                    return res.status(status.OK).json(new APIResponse("max invoice get successfully", false, 200, max + 1))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("max invoice not found", true, 404, max))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get max invoice", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get max invoice", true, 500, error.message))
        }
    }

    async updateinvoiceentry(req, res) {
        try {
            invoiceentryService.updateinvoiceentry(req.params.id, req.body).then((data) => {
                return res.status(status.OK).json(new APIResponse("invoice updated successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update invoice", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update invoice", true, 500, error.message))
        }
    }

    async deleteinvoiceentry(req, res) {
        try {
            invoiceentryService.deleteinvoiceentry(req.params.id).then((data) => {
                return res.status(status.OK).json(new APIResponse("invoice delete successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete invoice", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete invoice", true, 500, error.message))
        }
    }
}

module.exports = new invoiceentryController()
