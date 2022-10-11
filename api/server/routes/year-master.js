const YearMasters = require('../model/year-master');
const Joi = require('joi')
const status = require('http-status')
var router = require('express').Router();
var YearMasterController = require('../controller/year-master-controller');
const APIResponse = require('../helpers/APIResponse');
const httpStatus = require('http-status');

router.post('/create-year', YearMasterValidate, YearMasterController.createYear);

router.get('/get-all-year', YearMasterController.getAllYear)

router.get('/get-year/:id', YearMasterController.getYearById)

router.put('/update-year/:id', YearMasterController.updateYear)

router.delete('/delete-year/:id', YearMasterController.deleteYear)


var YearMasterJoi = Joi.object().keys({
   year_name: Joi.string().required().error(new Error('year name required'))
}).unknown()

function YearMasterValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = YearMasterJoi.validate(Data)
    if (error) {
        return res.status(status.BAD_REQUEST).json(new APIResponse(null, error.message, true, httpStatus.BAD_REQUEST))
    } else {
        return next();
    }
}

module.exports = router