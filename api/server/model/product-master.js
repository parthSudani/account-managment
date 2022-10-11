var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Utils = require('../helpers/utils');


var ProductMaster=new Schema({
    account_id: {type: mongoose.Schema.Types.ObjectId,ref:"account",required:true},
    product_name:{type:String,required:true },
    create_date:{type:String,required:true },
    is_deleted:{type:Boolean,default:false},
},
   {timestamps:true}
);

module.exports = mongoose.model("product", ProductMaster);