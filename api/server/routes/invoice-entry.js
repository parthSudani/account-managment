const invoiceentries = require('../model/invoice-entry');
const Joi = require('joi')
const status = require('http-status')
var router = require('express').Router();
var invoiceentryController = require('../controller/invoice-entry-controller');
const APIResponse = require('../helpers/APIResponse');
const httpStatus = require('http-status');

router.post('/create-invoiceentry', invoiceentryController.createinvoiceentry)

router.get('/get-all-invoiceentry', invoiceentryController.getAllinvoiceentry)

router.get('/get-invoiceentry/:id', invoiceentryController.getinvoiceentryById)

router.put('/update-invoiceentry/:id', invoiceentryController.updateinvoiceentry)

router.delete('/delete-invoiceentry/:id', invoiceentryController.deleteinvoiceentry)

router.get('/get-maxinoice/:id',invoiceentryController.getmaxinvoice)

var InvoiceentryJoi = Joi.object().keys({
    product_cout: Joi.number().required().error(new Error('product cost  name required')),
    product_price: Joi.number().required().error(new Error('product price  name required')),
    total_amount: Joi.number().required().error(new Error('total amount  name required')),
    cgst_per: Joi.number().optional(),
    sgst_per: Joi.number().optional(),
    less_per: Joi.number().optional(),
    sgst_amount: Joi.number().optional(),
    cgst_amount: Joi.number().optional(),
    less_amount: Joi.number().optional(),
    final_amount: Joi.number().optional(),
    create_date:Joi.date().optional()
}).unknown()

function invoiceentryValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = InvoiceentryJoi.validate(Data)
    if (error) {
        return res.status(status.BAD_REQUEST).json(new APIResponse(null, error.message, true, httpStatus.BAD_REQUEST))
    } else {
        return next();
    }
}
module.exports = router