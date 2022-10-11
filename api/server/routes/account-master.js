const AccountController = require('../controller/account-master-controller')
var router = require("express").Router();
const APIResponse = require('../helpers/APIResponse');
const httpStatus = require('http-status');
const Joi = require('joi');
const utils = require('../helpers/utils')

router.post('/create-account', AccountController.createAccount)

router.post('/login-account', AccountController.loginAccount)

router.get('/get-all-account', AccountController.getAllAccount)

router.get('/get-account/:id', AccountController.getAccountById)

router.put('/update-account/:id', AccountController.updateAccount)

router.delete('/delete-account/:id', AccountController.deleteAccount)

const accountValidation = Joi.object().keys({
    user_name: Joi.string().required().error(new Error('user name is required')),
    password: Joi.string().required().error(new Error('password is required'))
}).unknown();

function AccountValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = accountValidation.validate(Data)
    if (error) {
        return res.status(status.BAD_REQUEST).json(new APIResponse(null, error.message, true, httpStatus.BAD_REQUEST))
    } else {
        return next();
    }
}

module.exports = router;