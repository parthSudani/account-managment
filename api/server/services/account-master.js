const AccountMaster = require('../model/account-master')
const {static}=require('express');
const utils=require("../helpers/utils");

class AccountMasterService {
    static async createAccount(data) {
        var account = new AccountMaster(data)
        console.log("DATA:: "+JSON.stringify(data)+"  "+account)
        return await account.save();
    }
    static async loginAccount(name,pass){
        AccountMaster.password = utils.decrypt;
        return await AccountMaster.findOne({ user_name:name,password:pass,is_deleted:false})
        }
    static async getAllAccount() {
        return AccountMaster.find( { is_deleted: false  })
    }

    static async getAccountById(id) {
        return await AccountMaster.findOne({ _id: id, is_deleted: false })
    }

    static async updateAccount(id, data) {
        return AccountMaster.findByIdAndUpdate( { 
            _id: id,
        },{
         $set:data
        },
        { new:true }
        );
     
     };   

      static async deleteAccount(id){
        return await AccountMaster.findOneAndUpdate(
            {
            _id:id
        },{
              $set:{  is_deleted:true}
            },
            { raw:true }
        );
            
        };
    }

module.exports = AccountMasterService