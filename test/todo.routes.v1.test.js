//
// Tests voor ToDo routes van de API.
// Deze test is nog niet af. Probleem is namelijk dat 
//
process.env.NODE_ENV = 'test';
process.env.APP_USERNAME = 'username';
process.env.APP_PASSWORD = 'password';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var server = require('../server');
var should = chai.should();
var token;

chai.use(chaiHttp);

describe('GET /api/v1/films', function() {

    //
    // Before all tests: get a valid JWT token from the server
    //
    before(function (done) {
        var user = {
            username: "koen3",
            password: "test"
        }
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function (err, res) {
                res.body.should.be.an('object');
                res.body.should.have.property('token');
              // res.body.should.have.property('customer_id')
                token = res.body.token;
                done();
            });
    });


    it('should return the first film when logged in', function (done) {
        chai.request(server)
            .get('/api/v1/films?offset=1&count=1')
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                console.dir(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                //mock.verify();
                done();
            });
    });

    //
    //





    //
    // Before all tests: get a valid JWT token from the server
    before(function (done3) {
    var user = {
        username: "koen3",
        password: "test"
    };

        chai.request(server)
        .post('/api/v1/login')
        .send(user)
        .end(function (err, res) {
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            //res.body.should.have.property('customer_id');
            token = res.body.token;
            done3();
        });
    });


    it('should return all the films of user 3', function (done4) {
        chai.request(server)
            .get('/api/v1/rentals/17')
            .set('Authorization', 'Bearer ' + token)

            .end(function (err, res) {
                console.dir(err);
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                done4();
            });
    });

    //
    //


        //
        before(function (done5) {
            var user = {
                username: "koen3",
                password: "test"
            }
            chai.request(server)
                .post('/api/v1/login')
                .send(user)
                .end(function (err, res) {
                    res.body.should.be.an('object');
                    res.body.should.have.property('token');
              //      res.body.should.have.property('customer_id')
                    token = res.body.token;
                    done5();
                });

        });

        it('should add a film to user 3 with inventory id 1', function (done6) {
            chai.request(server)
                .post('/api/v1/rentals/3/1')
                .set('Authorization', 'Bearer ' + token)
                .end(function (err, res) {
                    console.dir(err);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').that.is.an('object');
                    done6();
                });
        });

        //
        //


        //
        // Before all tests: get a valid JWT token from the server

        before(function (done7) {
            var user = {
                username: "koen3",
                password: "test"


            }
            chai.request(server)
                .post('/api/v1/login')
                .send(user)
                .end(function (err, res) {
                    res.body.should.be.an('object');
                    res.body.should.have.property('token');
              //      res.body.should.have.property('customer_id')
                    token = res.body.token;
                    done7();
                });
        });

        //
        //


        //
        // Before all tests: get a valid JWT token from the server
        before(function (done9) {
            var user = {
                username: "koen3",
                password: "test"
            }
            chai.request(server)
                .post('/api/v1/login')
                .send(user)
                .end(function (err, res) {
                    res.body.should.be.an('object');
                    res.body.should.have.property('token');
               //     res.body.should.have.property('customer_id')
                    token = res.body.token;
                    done9();
                });
        });

        it('should delete a film from user 3 with inventory id 1', function (done10) {
            chai.request(server)
                .delete('/api/v1/rentals/3/1')
                .set('Authorization', 'Bearer ' + token)
                .end(function (err, res) {
                    console.dir(err);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').that.is.an('object');
                    done10();
                });
        });

    });


        //
        //






