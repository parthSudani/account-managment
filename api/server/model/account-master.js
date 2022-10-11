var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Utils = require('../helpers/utils');

var Account=new Schema({
     user_name:{type:String,required:true },
     password:{type:String,required:true},// ,set: Utils.encrypt },
     is_deleted:{type:Boolean,default:false},
  //   token:{type:String},
}  ,
    {timestamps:true}
);

module.exports = mongoose.model("account", Account);