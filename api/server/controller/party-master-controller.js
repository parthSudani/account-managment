const PartyMasterService = require('../services/party-master')
const status = require('http-status')
const invoiceentryService = require('../services/invoice-entry')
const AccountMasterService=require('../services/account-master');
const APIResponse = require('../helpers/APIResponse')
let JWTHelper=require('../helpers/utils');


class PartyMasterController {
    async createParty(req, res) {
        try {
            var account_id=await AccountMasterService.getAccountById(req.body.account_id)
            if(!account_id)
            {
                return res.status(status.BAD_REQUEST).json(new APIResponse("account id not found", false, 400))
            }
            PartyMasterService.createParty(req.body).then((data) => {
                return res.status(status.OK).json(new APIResponse("Party created successfully", false, 200,data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create party", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while create party", true, 500, error.message))
        }
    }

    async getAllParty(req, res) {
        try {
            await PartyMasterService.getAllParty().then((data) => {

                if (data) {
                    return res.status(status.OK).json(new APIResponse("Party list get successfully", false, 200, data))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("Party not found", true, 404, data))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get party", true, 500, error.message))
            })
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get party", true, 500, error.message))
        }
    }
    async getPartyById(req, res) {
        try {
            PartyMasterService.getPartyById(req.params.id).then((data) => {
                if (data) {
                    return res.status(status.OK).json(new APIResponse("Party get successfully", false, 200, data))
                } else {
                    return res.status(status.NOT_FOUND).json(new APIResponse("Party not found", true, 404, data))
                }
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get party", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while get party", true, 500, error.message))
        }
    }

    async updateParty(req, res) {
        try {
            PartyMasterService.updateParty(req.params.id, req.body).then((data) => {
                return res.status(status.OK).json(new APIResponse("Party updated successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update party", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while update party", true, 500, error.message))
        }
    }

    async deleteParty(req, res) {
        try {
            let data = await invoiceentryService.findByPartyId(req.params.id)
            if (data) {
                return res.status(status.OK).json(new APIResponse("First delete invoice entry", false, 400, data))
            }

            await PartyMasterService.deleteParty(req.params.id).then((data) => {
                return res.status(status.OK).json(new APIResponse("Party delete successfully", false, 200, data))
            }).catch((error) => {
                return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete party", true, 500, error.message))
            })
        } catch (error) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse("Error while delete party", true, 500, error.message))
        }
    }
}

module.exports = new PartyMasterController()