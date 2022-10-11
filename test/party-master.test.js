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
var user_name="bsjdbffjdnf"+Math.rendom
var id = ''
describe(' ', () => {
    before(async () => {
        const newAccount = new AccountMaster({
            "user_name": "bkkknnkijklkjjku"+Math.random(),
            "password": "123"
        });
        await newAccount.save();

        token = "Bearer " + jwt.sign(
            { user_name: newAccount.user_name },
            config.tokenSecret
        );

    })

    //CREATE
    it('status : 200,response: "success messge with party-master"', (done) => {
        request(app)
            .post('/api/ams/party/create-party')
            .set('authorization', token)
            .send({
                "account_id": "6039d6aec42f930d3cd4dd99",
                "company_name": "lCtordfdhghemekfrmLine Ingfotech"+Math.random(),
                "company_add": "l30gtgrd2, Ajghnkuerpfam Business Hub, Yogi Chowk, Surat"+Math.random(),
                "first_name": "lNijktgruefmjhgrfkknj"+Math.random(),
                "last_name": "lMalaertgrfllnhjgi"+Math.random(),
                "gst_no": "24AAlFQlrdftgrfjehPkgk4311CF"+Math.random(),
                "pan_no": "pgyvgyurjfdetgrkhjgj"+Math.random(),
                "mob_no": "9926617758"
            })
            .then((res) => {
                id = res.body.data._id;
                expect(res.status).to.eql(200);
                expect(res.body.message).to.eql("Party created successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild:("', (done) => {
        request(app)
            .post('/api/ams/party/create-party')
            .set('authorization', 'hfjgjkjdfk')
            .send({
                "account_id": "6039d6aec42f930d3cd4dd99",
                "company_name": "lCtordfdhghemekfrmLine Ingfotech"+Math.random(),
                "company_add": "l30gtgrd2, Ajghnkuerpfam Business Hub, Yogi Chowk, Surat"+Math.random(),
                "first_name": "lNijktgruefmjhgrfkknj"+Math.random(),
                "last_name": "lMalaertgrfllnhjgi"+Math.random(),
                "gst_no": "24AAlFQlrdftgrfjehPkgk4311CF"+Math.random(),
                "pan_no": "pgyvgyurjfdetgrkhjgj"+Math.random(),
                "mob_no": "9926617758"
            })
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})

//GET BY ID
describe('', () => {
    it('status : 200,response: "party get by id successfully"', (done) => {
        request(app)
            .get(`/api/ams/party/get-party/${id}`)
            .set('authorization', token)
            .then((res) => {
                console.log("res============>", JSON.stringify(res));
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("Party get successfully");
                done();
            }).catch(done)
    })
    it('status : 404,response: "party get by id not found successfully"', (done) => {
        request(app)
            .get('/api/ams/party/get-party/')
            .set('authorization', token)
            .then((res) => {
                console.log("res============>", JSON.stringify(res));
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get(`/api/ams/party/get-party/${id}`)
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
    it('status : 200,response: "party get by id successfully"', (done) => {
        request(app)
            .get('/api/ams/party/get-all-party')
            .set('authorization', token)
            .then((res) => {
                console.log("res============>", JSON.stringify(res));
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("Party list get successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get('/api/ams/party/get-all-party')
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
    it('status : 200,response: "update all party"', (done) => {
        request(app)
            .put(`/api/ams/party/update-party/${id}`)
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("Party updated successfully");
                done();
            }).catch(done)
    })

    it('status : 404,response: "update all party"', (done) => {
        request(app)
            .put('/api/ams/party/update-party/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .put(`/api/ams/party/update-party/${id}`)
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
    it('status : 200,response: "delete all year"', (done) => {
        request(app)
            .delete(`/api/ams/party/delete-party/${id}`)
            .set('authorization', token)
            .then((res) => {
                console.log("res============>", JSON.stringify(res));
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("Party delete successfully");
                done();
            }).catch(done)
    })
    it('status : 404,response: "delete all year"', (done) => {
        request(app)
            .delete('/api/ams/party/delete-party/')
            .set('authorization', token)
            .then((res) => {
                console.log("res============>", JSON.stringify(res));
                expect(res.status).to.eql(404)
              
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .delete(`/api/ams/party/delete-party/${id}`)
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })


})