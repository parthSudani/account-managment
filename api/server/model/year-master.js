var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Utils = require('../helpers/utils');


var YearMaster=new Schema({
    account_id: {type: mongoose.Schema.Types.ObjectId,ref:"account",required:true},
    year_name:{type:String,required:true },
    is_deleted:{type:Boolean,default:false},
},
   {timestamps:true}
);

module.exports = mongoose.model("year", YearMaster);