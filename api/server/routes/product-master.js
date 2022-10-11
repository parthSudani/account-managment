const PartyMaster = require('../model/party-master');
const Joi = require('joi')
const status = require('http-status')
var router = require('express').Router();
var ProductMasterController = require('../controller/product-master-controller');
const APIResponse = require('../helpers/APIResponse');
const httpStatus = require('http-status');

router.post('/create-product', productMasterValidate, ProductMasterController.createProduct)

router.get('/get-all-product', ProductMasterController.getAllProduct)

router.get('/get-product/:id', ProductMasterController.getProductById)

router.put('/update-product/:id', ProductMasterController.updateProduct)

router.delete('/delete-product/:id', ProductMasterController.deleteProduct)

var productMasterJoi = Joi.object().keys({
    product_name: Joi.string().required().error(new Error('product name required'))
   
}).unknown()

function productMasterValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = productMasterJoi.validate(Data)
    if (error) {
        return res.status(status.BAD_REQUEST).json(new APIResponse(null, error.message, true, httpStatus.BAD_REQUEST))
    } else {
        return next();
    }
}

module.exports = router