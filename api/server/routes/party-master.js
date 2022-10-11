const PartyMaster = require('../model/party-master');
const Joi = require('joi')
const status = require('http-status')
var router = require('express').Router();
var PartyMasterController = require('../controller/party-master-controller');
const APIResponse = require('../helpers/APIResponse');
const httpStatus = require('http-status');


router.post('/create-party', partyMasterValidate, PartyMasterController.createParty)

router.get('/get-all-party', PartyMasterController.getAllParty)


router.get('/get-party/:id', PartyMasterController.getPartyById)

router.put('/update-party/:id', PartyMasterController.updateParty)

router.delete('/delete-party/:id', PartyMasterController.deleteParty)

var partyMasterJoi = Joi.object().keys({
    company_name: Joi.string().required().error(new Error('Company name required')),
    company_add: Joi.string().required().error(new Error('Company address required')),
    first_name: Joi.string().required().error(new Error('First name required')),
    last_name: Joi.string().required().error(new Error('Last name required')),
    gst_no: Joi.string().optional(),
    pan_no: Joi.string().optional(),
    mob_no: Joi.string().required().length(10).pattern(/^[0-9]+$/).required()
}).unknown()

function partyMasterValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = partyMasterJoi.validate(Data)
    if (error) {
        return res.status(status.BAD_REQUEST).json(new APIResponse(null, error.message, true, httpStatus.BAD_REQUEST))
    } else {
        return next();
    }
}


module.exports = router