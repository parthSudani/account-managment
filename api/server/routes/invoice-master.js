const InvoiceMaster = require('../model/invoice-master');
const Joi = require('joi')
const status = require('http-status')
var router = require('express').Router();
var InvoiceMasterController = require('../controller/invoice-master-controller');
const APIResponse = require('../helpers/APIResponse');
const httpStatus = require('http-status');

router.post('/create-invoice', InvoiceMasterValidate, InvoiceMasterController.createInvoice)

router.get('/get-all-invoice', InvoiceMasterController.getAllInvoice)

router.get('/get-invoice/:id', InvoiceMasterController.getInvoiceById)

router.put('/update-invoice/:id', InvoiceMasterController.updateInvoice)

router.delete('/delete-invoice/:id', InvoiceMasterController.deleteInvoice)

var InvoiceMasterJoi = Joi.object().keys({
    company_name: Joi.string().required().error(new Error('Company name required')),
    company_add: Joi.string().required().error(new Error('Company address required')),
    first_name: Joi.string().required().error(new Error('First name required')),
    last_name: Joi.string().required().error(new Error('Last name required')),
    gst_no: Joi.string().optional(),
    pan_no: Joi.string().optional(),
    mob_no: Joi.string().required().length(10).pattern(/^[0-9]+$/).required()
}).unknown()

function InvoiceMasterValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = InvoiceMasterJoi.validate(Data)
    if (error) {
        return res.status(status.BAD_REQUEST).json(new APIResponse(null, error.message, true, httpStatus.BAD_REQUEST))
    } else {
        return next();
    }
}

module.exports = router