var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Utils = require('../helpers/utils');


var Invoice=new Schema({

    invoice_no:{type:Number,required:true },
    invoice_id:{type: Schema.Types.ObjectId,ref:"invoicemaster",required:true},
    product_id:{type: Schema.Types.ObjectId,ref:"product",required:true},
    product_cout:{type:Number,required:true },
    product_price:{type:Number,required:true },
    total_amount:{type:Number,required:true },
    cgst_per:{type:Number,required:true },
    sgst_per:{type:Number,required:true },
    less_per:{type:Number,required:true },
    sgst_amount:{type:Number,required:true },
    cgst_amount:{type:Number,required:true },
    less_amount:{type:Number,required:true },
    final_amount:{type:Number,required:true },
    create_date:{type:String,required:false },
    year_id:{type:Schema.Types.ObjectId,required:true,ref:"year",required:true },
    is_deleted:{type:Boolean,default:false},
}  ,
   {timestamps:true}
);
Invoice.index({party_id:1,invoice_no:1}, { unique: true });
module.exports = mongoose.model("invoiceentry", Invoice);