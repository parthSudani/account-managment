const PartyMaster = require('../model/party-master')

class PartyMasterService {
    static async createParty(data) {
        return PartyMaster.create(data)
    }

    static async getAllParty() {
        return PartyMaster.find({ is_deleted: false })
    }

    static async getPartyById(id) {
        return PartyMaster.findOne({ _id: id, is_deleted: false })
    }

    static async updateParty(id, data) {
        return PartyMaster.findByIdAndUpdate( { 
            _id: id,
        },{
         $set:data
        },
        { new:true }
        );
    }

    static async deleteParty(id) {
        return PartyMaster.findOneAndUpdate(
            {
            _id:id
        },{
              $set:{  is_deleted:true}
            },
            { raw:true }
        );
            
        };
}

module.exports = PartyMasterService