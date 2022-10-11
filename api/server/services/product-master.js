const ProductMaster = require('../model/product-master')

class ProductMasterService {
    static async createProduct(data) {
        return ProductMaster.create(data)
    }

    static async getAllProduct() {
        return ProductMaster.find({ is_deleted: false })
    }

    static async getProductById(id) {
        return ProductMaster.findOne({ _id: id, is_deleted: false })
    }

    static async updateProduct(id, data) {
        return ProductMaster.findByIdAndUpdate( { 
            _id: id,
        },{
         $set:data
        },
        { new:true }
        );
    }

    static async deleteProduct(id) {
        return ProductMaster.findOneAndUpdate(
            {
            _id:id
        },{
              $set:{  is_deleted:true}
            },
            { raw:true }
        );
            
        };
}

module.exports = ProductMasterService