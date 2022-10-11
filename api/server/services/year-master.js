const YearMasters = require('../model/year-master')

class YearMasterService {
    static async createYear(data) {
        return YearMasters.create(data)
    }

    static async getAllYear() {
        return YearMasters.find ({ is_deleted: false })
    }

    static async getYearById(id) {
        return YearMasters.findOne({  _id: id, is_deleted: false })
    }

    static async updateYear(id, data) {
        return YearMasters.findByIdAndUpdate( { 
            _id: id,
        },{
         $set:data
        },
        { new:true }
        );
    }
    static async deleteYear(id) {
        return YearMasters.findOneAndUpdate(
            {
            _id:id
        },{
              $set:{  is_deleted:true}
            },
            { raw:true }
        );
            
        };
}

module.exports = YearMasterService