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
let user_name="dhruvi"+ Math.random();

var id = ''
//describe(' ', () => {
    //create
    describe('', () => {
        it('status : 200,response: "success messge with account-master"', (done) => {
            request(app)
                .post('/api/auth/account/create-account')
                .send({
                    "user_name": user_name,
                    "password": "123"
                })
                .then((res) => {
                    console.log("res=======>",JSON.stringify(res))
                    id = res.body.data._id
                    expect(res.status).to.eql(200);
                    expect(res.body.message).to.eql("Accountmaster created successfully");
                    done();
                }).catch(done)
        })
    })

    //login
    describe('', () => {
        it('status : 200,response: "success messge with login account-master"', (done) => {
            request(app)
                .post('/api/auth/account/login-account')
                .send({
                    "user_name": user_name,
                    "password": "123"
                })
                .then((res) => {
                    console.log("res============", JSON.stringify(res))
                    expect(res.status).to.eql(200);
                    expect(res.body.message).to.eql("account login successfully");
                    done();
                }).catch(done)
        })
    })

    //getbyid
    describe('', () => {
        it('status : 200,response: "account get by id successfully"', (done) => {
            request(app)
                .get(`/api/auth/account/get-account/${id}`)
                .then((res) => {
                    console.log("res============>", JSON.stringify(res));
                    expect(res.status).to.eql(200)
                    expect(res.body.message).to.eql("Accountmaster get successfully");
                    done();
                }).catch(done)
        })

        it('status : 200,response: "account get by id not found successfully"', (done) => {
            request(app)
                .get('/api/auth/account/get-account/')
                .then((res) => {
                    console.log("res============>", JSON.stringify(res));
                    expect(res.status).to.eql(404)
                    done();
                }).catch(done)
        })
    })

    //GET
    describe('', () => {
        it('status : 200,response: "Party list get successfully"', (done) => {
            request(app)
                .get('/api/auth/account/get-all-account')
                .then((res) => {
                    expect(res.status).to.eql(200)
                    expect(res.body.message).to.eql("Accountmaster list get successfully");
                    done();
                }).catch(done)
        })
    })
    //update
    describe('', () => {
        it('status : 200,response: "update all account"', (done) => {
            request(app)
                .put(`/api/auth/account/update-account/${id}`)
                .then((res) => {
                    expect(res.status).to.eql(200)
                    expect(res.body.message).to.eql("Accountmaster updated successfully");
                    done();
                }).catch(done)
        })
    
        it('status : 200,response: "update all not found by id account"', (done) => {
            request(app)
                .put('/api/auth/account/update-account/')
                .then((res) => {
                    expect(res.status).to.eql(404)
                  
                    done();
                }).catch(done)
        })
    })

    //delete
    describe('', () => {
        it('status : 200,response: "delete all account"', (done) => {
            request(app)
                .delete(`/api/auth/account/delete-account/${id}`)
                .then((res) => {
                    expect(res.status).to.eql(200)
                    expect(res.body.message).to.eql("Accountmaster delete successfully");
                    done();
                }).catch(done)
        })
    })
    it('status : 200,response: "delete all not found by id account"', (done) => {
        request(app)
            .delete('/api/auth/account/delete-account/')
            .then((res) => {
                expect(res.status).to.eql(404)
                done();
            }).catch(done)
    })
//})

