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


describe(' ', () => {
    before(async () => {
        const newAccount = new AccountMaster({
            "user_name": "bkkkkijdddgklkjjku" + Math.random(),
            "password": "123"
        });
        await newAccount.save();

        token = "Bearer " + jwt.sign(
            { user_name: newAccount.user_name },
            config.tokenSecret
        );

    })

    //CREATE
    it('status : 200,response: "success messge with year_name"', (done) => {
        request(app)
            .post('/api/ams/year/create-year')
            .set('authorization', token)
            .send({
                "account_id": "6039d6aec42f930d3cd4dd99",
                "year_name": "2012-20" + Math.random()
            })
            .then((res) => {
                id = res.body.data._id;
                expect(res.status).to.eql(200);
                expect(res.body.message).to.eql("Year created successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild:("', (done) => {
        request(app)
            .post('/api/ams/year/create-year')
            .set('authorization', 'hfjgjkjdfk')
            .send({
                "account_id":"6039d6aec42f930d3cd4dd99",
                "year_name": "2012-20" + Math.random()
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
    it('status : 200,response: "get all year by id"', (done) => {
        request(app)
            .get(`/api/ams/year/get-year/${id}`)
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("year get successfully");
                done();
            }).catch(done)
    })

    it('status : 200,response: "product get by id successfully"', (done) => {
        request(app)
            .get('/api/ams/year/get-year')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get(`/api/ams/year/get-year/${id}`)
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
    it('status : 200,response: "get all year"', (done) => {
        request(app)
            .get('/api/ams/year/get-all-year')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("year list get successfully");
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .get('/api/ams/year/get-all-year')
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
            .put(`/api/ams/year/update-year/${id}`)
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("year updated successfully");
                done();
            }).catch(done)
    })

    it('status : 200,response: "product get by id successfully"', (done) => {
        request(app)
            .get('/api/ams/year/update-year/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })

    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .put(`/api/ams/year/update-year/${id}`)
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
            .delete(`/api/ams/year/delete-year/${id}`)
            .set('authorization', token)
            .then((res) => {
                console.log("res============>", JSON.stringify(res));
                expect(res.status).to.eql(200)
                expect(res.body.message).to.eql("year delete successfully");
                done();
            }).catch(done)
    })


    it('status : 200,response: "product get by id successfully"', (done) => {
        request(app)
            .get('/api/ams/year/delete-year/')
            .set('authorization', token)
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })
    it('status:401, response : "token is invaild "', (done) => {
        request(app)
            .delete(`/api/ams/year/delete-year/${id}`)
            .set('authorization', 'sdgvhuishxcvhjh')
            .then((res) => {
                expect(res.status).to.eql(500)
                expect(res.body.message).to.eql("Invalid token.");
                done();
            }).catch(done)
    })
})