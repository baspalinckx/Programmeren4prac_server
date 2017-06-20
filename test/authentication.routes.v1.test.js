//
// Tests voor versie 1 van de API.
//
// Referentie: zie http://chaijs.com/api/bdd/#members-section
//
process.env.NODE_ENV = 'test';
process.env.APP_USERNAME = 'username';
process.env.APP_PASSWORD = 'password';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('Auth API v1', function() {

    it('returns UnauthorizedError on GET /api/v1/films when not logged in', function (done) {
        chai.request(server)
            .get('/api/v1/films?offset=1&count=1')
            .end(function (err, res) {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').equal('No authorization token was found');
                res.body.should.have.property('name').equal('UnauthorizedError');
                done();
            });
    });




    it('returns an error on POST /api/v1/login ', function(done2) {
        var userwrong = {
            username: "invalid",
            password: "invalid"
        }
        chai.request(server)
            .post('/api/v1/login')
            .send(userwrong)
            .end(function(err, res) {
                //res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('code').equal(204);
                res.body.should.have.property('success').equal('Email does not exits');
                done2();
            });
    });

    it('returns a token on POST /api/v1/login', function(done3) {
        var user = {
            username: "koen3",
            password: "test"
        }
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('token').that.is.a('string');
                done3();
            });
    });

});