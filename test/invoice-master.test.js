const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const router = require('../routes')
const expect = chai.expect;
const AccountMaster = require('../api/server/model/account-master');
const jwt = require('jsonwebtoken')
const config = require('../config');
const { Router } = require('express');
var app = require('../index');
const { tokenSecret } = require('../config');
var user_name="sdgfjhhhdghlh"+Math.random();
var id=''
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
    it('status : 200,response: "success messge with invoice-master"', (done) => {
        request(app)
            .post('/api/ams/invoice/create-invoice')
            .set('authorization', token)
            .send({
                "account_id": "603660a1cf90ce2b489a7764",
                "company_name": "dhfkjlhrvi"+Math.random(),
                "company_add": "dsgvfvfd"+Math.random(),
                "first_name": "rgfd"+Math.random,
                "last_name": "hhcrf"+Math.random(),
                "gst_no": "12mrvk"+Math.random(),
                "pan_no": "34mvnf06"+Math.random(),
                "mob_no": "1201151646"
            })
            .then((res) => {
                id = res.body.data._id;
                console.log("res============", JSON.stringify(res.body.data.invoice_id))
                expect(res.status).to.eql(200);
                expect(res.body.message).to.eql("invoice created successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild:("', (done) => {
        request(app)
            .post('/api/ams/invoice/create-invoice')
            .set('authorization', 'hfjgjkjdfk')
            .send({
                "account_id":"6039d6aec42f930d3cd4dd99",
                "company_name": "dhfkjlhrvi"+Math.random(),
                "company_add": "dsgvfvfd"+Math.random(),
                "first_name": "rgfd"+Math.random,
                "last_name": "hhcrf"+Math.random(),
                "gst_no": "12mrvk"+Math.random(),
                "pan_no": "34mvnf06"+Math.random(),
                "mob_no": "1201151646"+Math.random()
            })
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })

    //getbyid
    describe('', () => {
        it('status : 200,response: "invoice get by id successfully"', (done) => {
            request(app)
                .get(`/api/ams/invoice/get-invoice/${id}`)
                .set('authorization', token)
                .then((res) => {
                    expect(res.status).to.eql(200)
                    expect(res.body.message).to.eql("invoice get successfully");
                    done();
                }).catch(done)
        })
        it('status : 200,response: "invoice get by id successfully"', (done) => {
            request(app)
                .get('/api/ams/invoice/get-invoice/')
                .set('authorization', token)
                .then((res) => {
                    expect(res.status).to.eql(404)
                    done();
                }).catch(done)
        })

        it('status:401, response : "token is invaild "', (done) => {
            request(app)
                .get(`/api/ams/invoice/get-invoice/${id}`)
                .set('authorization', 'sdgvhuishxcvhjh')
                .then((res) => {
                    expect(res.status).to.eql(500)
                    expect(res.body.message).to.eql("Invalid token.");
                    done();
                }).catch(done)
        })
    })

    //GET
    describe('', () => {
        it('status : 200,response: "Party list get successfully"', (done) => {
            request(app)
                .get('/api/ams/invoice/get-all-invoice')
                .set('authorization', token)
                .then((res) => {
                    expect(res.status).to.eql(200)
                    expect(res.body.message).to.eql("invoice list get successfully");
                    done();
                }).catch(done)
        })

       

        it('status:401, response : "token is invaild "', (done) => {
            request(app)
                .get('/api/ams/invoice/get-all-invoice')
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
        it('status : 200,response: "update all year"', (done) => {
            request(app)
                .put(`/api/ams/invoice/update-invoice/${id}`)
                .set('authorization', token)
                .then((res) => {
                    expect(res.status).to.eql(200)
                    expect(res.body.message).to.eql("invoice updated successfully");
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
                .put(`/api/ams/invoice/update-invoice/${id}`)
                .set('authorization', 'sdgvhuishxcvhjh')
                .then((res) => {
                    expect(res.status).to.eql(500)
                    expect(res.body.message).to.eql("Invalid token.");
                    done();
                }).catch(done)
        })
    })

})
// delete
describe('', () => {
    it('status : 200,response: "delete all invoice"', (done) => {
        request(app)
            .delete(`/api/ams/invoice/delete-invoice/${id}`)
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("invoice delete successfully");
                done();
            }).catch(done)
    })
    it('status : 404,response: "delete all invoice"', (done) => {
        request(app)
            .delete('/api/ams/invoice/delete-invoice/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .delete(`/api/ams/invoice/delete-invoice/${id}`)
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})