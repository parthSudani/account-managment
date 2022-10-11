const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const router = require('../routes')
const expect = chai.expect;
const YearMasters = require('../api/server/model/product-master')
const AccountMaster = require('../api/server/model/account-master');
const jwt = require('jsonwebtoken')
const config = require('../config');
const { Router } = require('express');
var app = require('../index');
const { tokenSecret } = require('../config');

var id = ''
describe(' ', () => {
    before(async () => {
        const newAccount = new AccountMaster({
            "user_name": "booge" + Math.random(),
            "password": "12ir3"
        });
        await newAccount.save();

        token = "Bearer " + jwt.sign(
            { user_name: newAccount.user_name },
            config.tokenSecret
        );

    })
    //CRATE
    it('status : 200,response: "success message product master"', (done) => {
        request(app)
            .post('/api/ams/product/create-product')
            .set('authorization', token)
            .send({
                "account_id":"6039d6aec42f930d3cd4dd99",
                "product_name": "fhfjnjkG" + Math.random(),
                    "create_date":"20-02-2002"
            })
            .then((res) => {
                id = res.body.data._id;
                expect(res.status).to.eql(200);
                expect(res.body.message).to.eql("Product created successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild :("', (done) => {
        request(app)
            .post('/api/ams/product/create-product')
            .set('authorization', 'hfjgjkjdfk')
            .send({
                "account_id":"6039d6aec42f930d3cd4dd99",
                "product_name": "fhfkG" + Math.random(),
                "create_date":"20-02-2002"
            })
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})
//GET
describe('', () => {
    it('status : 200,response: "Product list get successfully"', (done) => {
        request(app)
            .get('/api/ams/product/get-all-product')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("Product list get successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get('/api/ams/product/get-all-product')
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})
//GET BY ID
describe('', () => {
    it('status : 200,response: "Product list get by id successfully"', (done) => {
        request(app)
            .get(`/api/ams/product/get-product/${id}`)
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("Product get successfully");
                done();
            }).catch(done)
    })

    it('status : 200,response: "product get by id successfully"', (done) => {
        request(app)
            .get('/api/ams/product/get-product/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })
    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get(`/api/ams/product/get-product/${id}`)
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})
//UPDATE

describe('', () => {
    it('status : 200,response: "update all year"', (done) => {
        request(app)
            .put(`/api/ams/product/update-product/${id}`)
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("Product updated successfully");
                done();
            }).catch(done)
    })


    it('status : 404,response: "update all by id not found year"', (done) => {
        request(app)
            .put('/api/ams/invoice/update-invoice/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .put(`/api/ams/product/update-product/${id}`)
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})

//delete
describe('', () => {
    it('status : 200,response: "delete all product"', (done) => {
        request(app)
            .delete(`/api/ams/product/delete-product/${id}`)
            .set('authorization', token)
            .then((res) => {
                console.log("res============>", JSON.stringify(res));
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("Product delete successfully");
                done();
            }).catch(done)
    })

    it('status : 404,response: "update all by id not found year"', (done) => {
        request(app)
            .put('/api/ams/product/delete-product/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })
    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .delete(`/api/ams/product/delete-product/${id}`)
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })


})