const invoiceentries = require('../model/invoice-entry')

const database = require('../../../config');
const mongoose = require('mongoose')


class invoiceentryService {
    static async createinvoiceentry(data) {
        return invoiceentries.create(data);
    }
    static async getAllinvoiceentry() {
        return invoiceentries.find({ is_deleted: false })
    }

    static async getinvoiceentryById(id) {
        return invoiceentries.findOne({invoice_no: id, is_deleted: false }
        )
    }

    static async getmaxinvoice(partyid) {
        console.log("PARTY_ID:: " + partyid)
        return await invoiceentries.aggregate([{
            $match: { party_id: mongoose.Types.ObjectId(partyid) }
        },
        {
            $group:
            {
                _id: "$party_id",
                max_invoice_no: { $max: "$invoice_no" }
            }
        }
        ]
        )
    }

    static async findByPartyId(id) {
        return invoiceentries.findOne({ party_id: id, is_deleted: false })
    }

    static async findByInvoiceId(id) {
        return invoiceentries.findOne({ invoice_id: id, is_deleted: false })
    }

    static async findbyProductId(id) {
        return invoiceentries.findOne({ product_id: id, is_deleted: false })
    }

    static async findYearById(id) {
        return invoiceentries.findOne({ year_name: id, is_deleted: false })
    }


    static async updateinvoiceentry(id, data) {
        return invoiceentries.findOneAndUpdate( { 
            invoice_no: id,
        },{
         $set:data
        },
        { new:true }
        );
     
     };   
   

    static async deleteinvoiceentry(id) {
        return invoiceentries.findOneAndUpdate(
            {
            invoice_no:id
        },{
              $set:{  is_deleted:true}
            },
            { raw:true }
        );
            
        };
}
module.exports = invoiceentryService