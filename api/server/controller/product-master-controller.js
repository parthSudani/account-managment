const ProductMasterService = require('../services/product-master')
const AccountMasterService=require('../services/account-master');
const status = require('http-status')
const invoiceentryService = require('../services/invoice-entry')
const APIResponse = require('../helpers/APIResponse')
class ProductMasterController {
    async createProduct(req, res) {
        try {
            var account_id=await AccountMasterService.getAccountById(req.body.account_id)
            if(!account_id)
            {
                return res.status(status.BAD_REQUEST).json(new APIResponse("account id not found", false, 400))
            }
            ProductMasterService.createProduct(req.body).then((data) => {
              
                return res.status(status.OK).json(new APIResponse("Product created successfully", false, 200, data))
            }).catch((error) => {
               
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create Product", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create Product", true, 500, error.message))
        }
    }

    async getAllProduct(req, res) {
        try {
            ProductMasterService.getAllProduct().then((data) => {
                if (data) {
                    return res.status(status.OK).json(new APIResponse("Product list get successfully", false, 200, data))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("Product not found", true, 404, data))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get Product", true, 500, error.message))
            })
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get Product", true, 500, error.message))
        }
    }


    async getProductById(req, res) {
        try {
            ProductMasterService.getProductById(req.params.id).then((data) => {
                if (data) {
                    return res.status(status.OK).json(new APIResponse("Product get successfully", false, 200, data))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("Product not found", true, 404, data))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get Product", true, 500, error.message))
            })
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get Product", true, 500, error.message))
        }
    }

    async updateProduct(req, res) {
        try {
            ProductMasterService.updateProduct(req.params.id, req.body).then((data) => {
                return res.status(status.OK).json(new APIResponse("Product updated successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update Product", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update Product", true, 500, error.message))
        }
    }

    async deleteProduct(req, res) {
        try {
            let data = await invoiceentryService.findbyProductId(req.params.id)
            if (data) {
                return res.status(status.OK).json(new APIResponse("fist delete in invoice entry", false, 400, data))
            }
            await ProductMasterService.deleteProduct(req.params.id).then((data) => {
                return res.status(status.OK).json(new APIResponse("Product delete successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete Product", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete Product", true, 500, error.message))
        }
    }
}

module.exports = new ProductMasterController()
