const InvoiceMaster = require('../model/invoice-master')

class InvoiceMasterService {
    static async createInvoice(data) {
        return InvoiceMaster.create(data)
    }

    static async getAllInvoice() {
        return InvoiceMaster.find( { is_deleted: false  })
    }

    static async getInvoiceById(id) {
        return InvoiceMaster.findOne( { _id: id, is_deleted: false })
    }

    static async updateInvoice(id, data) {
        return InvoiceMaster.findOneAndUpdate( { 
            _id: id,
        },{
         $set:data
        },
        { new:true }
        );
     
     };   
    static async deleteInvoice(id) {
        return InvoiceMaster.findOneAndUpdate(
            {
            _id:id
        },{
              $set:{  is_deleted:true}
            },
            { raw:true }
        );
            
        };
}

module.exports = InvoiceMasterService