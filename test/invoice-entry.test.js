const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const router = require('../routes')
const expect = chai.expect;
const YearMasters = require('../api/server/model/year-master')
const AccountMaster = require('../api/server/model/account-master');
const jwt = require('jsonwebtoken')
const config = require('../config');
const { Router } = require('express');
var app = require('../index');
const { tokenSecret } = require('../config');
var user_name="fasdhdjvj"+Math.random();
const invoice_no=400;
var id = ''
describe(' ', () => {
    before(async () => {
        const newAccount = new AccountMaster({
            "user_name": user_name,
            "password": "123"
        });
        await newAccount.save();

        token = "Bearer " + jwt.sign(
            { user_name: newAccount.user_name },
            config.tokenSecret
        );

    })
    //CREATE
    it('status : 200,response: "success messge with invoice-masterentry"', (done) => {
        request(app)
            .post('/api/ams/invoiceentry/create-invoiceentry')
            .set('authorization', token)
            .send({
                  
					"invoice_no": 17,
                    "invoice_id":"603660b8cf90ce2b489a7765",
                    "party_id": "60366194ef805e41d8914a19",
                    "product_id": "6036615fc341772b54b0c83c",
                    "product_cout": 20,
                    "product_price": 50,
                    "total_amount": 70,
                    "cgst_per": 20,
                    "sgst_per": 30,
                    "less_per": 70,
                    "sgst_amount": 50,
                    "cgst_amount": 30,
                    "less_amount": 40,
                    "final_amount": 40,
                    "year_id": "6039ed16e1e8011dec444186"
            })
            .then((res) => {
                id = res.body.data.invoice_no
                console.log("res--->",JSON.stringify(res));
                expect(res.status).to.eql(200);
                expect(res.body.message).to.eql("invoice created successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild:("', (done) => {
        request(app)
            .post('/api/ams/invoiceentry/create-invoiceentry')
            .set('authorization', 'hfjgjkjdfk')
            .send({
                "invoice_no": 4,
                "invoice_id":"603660b8cf90ce2b489a7765",
                "party_id": "60366194ef805e41d8914a19",
                "product_id": "6036615fc341772b54b0c83c",
                "product_cout": 20,
                "product_price": 50,
                "total_amount": 70,
                "cgst_per": 20,
                "sgst_per": 30,
                "less_per": 70,
                "sgst_amount": 50,
                "cgst_amount": 30,
                "less_amount": 40,
                "final_amount": 40,
                "year_name": "2020-21"
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
    it('status : 200,response: "invoice list get successfully"', (done) => {
        request(app)
            .get('/api/ams/invoiceentry/get-all-invoiceentry')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("invoice list get successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get('/api/ams/invoiceentry/get-all-invoiceentry')
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})


describe('', () => {
    it('status : 200,response: "invoice-entry by id list get successfully"', (done) => {
        request(app)
            .get(`/api/ams/invoiceentry/get-invoiceentry/${id}`)
            .set('authorization', token)
            .then((res) => {
                console.log("res========>",JSON.stringify(res))
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("invoice get successfully");
                done();
            }).catch(done)
    })

    it('status : 200,response: "invoice-entry by id not list get successfully"', (done) => {
        request(app)
            .get('/api/ams/invoiceentry/get-invoiceentry/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
             //   expect(res.body.message).to.eql("invoice get successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get(`/api/ams/invoiceentry/get-invoiceentry/${id}`)
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})

//update
describe('', () => {
    it('status : 200,response: "update all invoiceentry"', (done) => {
        request(app)
            .put(`/api/ams/invoiceentry/update-invoiceentry/${id}`)
            .set('authorization', token)
            .then((res) => {
                console.log("res==============================>",JSON.stringify(res))
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("invoice updated successfully");
                done();
            }).catch(done)
    })
    it('status : 200,response: "update by id not found year"', (done) => {
        request(app)
            .put('/api/ams/invoiceentry/update-invoiceentry/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
             //   expect(res.body.message).to.eql("invoice updated successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .put(`/api/ams/invoiceentry/update-invoiceentry/${id}`)
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
    it('status : 200,response: "delete all invoiceentry"', (done) => {
        request(app)
            .delete(`/api/ams/invoiceentry/delete-invoiceentry/${id}`)
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("invoice delete successfully");
                done();
            }).catch(done)
    })
    it('status : 200,response: "delete all invoice id not found"', (done) => {
        request(app)
            .delete('/api/ams/invoiceentry/delete-invoiceentry/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                //expect(res.body.message).to.eql("invoice delete successfully");
                done();
            }).catch(done)
    })
    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .delete(`/api/ams/invoiceentry/delete-invoiceentry/${id}`)
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })

    
})


//getmax
describe('', () => {
    it('status : 200,response: "get max invoice"', (done) => {
        request(app)
            .get('/api/ams/invoiceentry/get-maxinoice/60366194ef805e41d8914a19')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("max invoice get successfully");
                done();
            }).catch(done)
    })

   it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get('/api/ams/invoiceentry/get-maxinoice/60366194ef805e41d8914a19')
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })

    
})