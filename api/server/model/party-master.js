var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Utils = require('../helpers/utils');


var PartyMaster=new Schema({
    account_id: {type: mongoose.Schema.Types.ObjectId,ref:"account",required:true},
    company_name:{type:String,required:true },
    company_add:{type:String,required:true },
    first_name:{type:String,required:true },
    last_name:{type:String,required:true },
    gst_no:{type:String,required:true },
    pan_no:{type:String,required:true },
    mob_no:{type:String,required:true },
    is_deleted:{type:Boolean,default:false},
},
   {timestamps:true}
);

module.exports = mongoose.model("party", PartyMaster);