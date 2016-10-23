var request = require('supertest'),
    assert = require('assert'),
    express = require('express'),
    session = require('express-session');
//var server = require('../app');
//server.use(session({
//    secret: 'testest',
//    cookies:{},
//    resave: true,
//    saveUninitialized: true
//}));
//server.all('*', function(req, res, next) {
//    //authenticated(req, res, next);
//    //OR
//    req.session.token = {
//        access_token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0S1JHUTUiLCJhdWQiOiIyMjdNRFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNDcwNzkwNDgxLCJpYXQiOjE0NzA3NjE2ODF9.hpBkNJvMYB56TO8t6SBoSiMId_rEW_nD0bR_53f8hT4",
//        expires_in: 28800,
//        refresh_token: "6ca1970d7ad42be02ab26869daad48658cc073bec7c480220a0997c3f1e0a652",
//        scope: "heartrate social location weight settings nutrition activity sleep profile",
//        token_type: "Bearer",
//        user_id: "4KRGQ5"
//    };
//    next();
//});

describe('loading express', function () {
    var server;
    var token = {
        token: {
            access_token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0S1JHUTUiLCJhdWQiOiIyMjdNRFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNDc2ODc4MzUyLCJpYXQiOjE0NzY4NDk1NTJ9.WqOmzzVJfxYFhqO_IeM3GOUvD9fhZUIKr7nAUf2CrHI",
            expires_in: 28800,
            refresh_token: "b536dfed5bc279840dc6623fb852782d51215beb39775efa0d506d5ed7befa67",
            scope: "profile social location nutrition sleep heartrate settings weight activity",
            token_type: "Bearer",
            user_id: "4KRGQ5"
        }
    };
    beforeEach(function () {
        server = require('../app');
    });
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200)
            .end(function(err, response){
                assert.ok(!err);
                return done();
            });
    });

    it('responds to /profile', function testProfile(done) {
        this.timeout(50000);
        request(server)
            .get('/profile')
            .send(token)
            .expect(200)
            .end(function(err, response){
                assert.ok(!err);
                assert.ok( response.body.user !== 'undefined' );
                console.log(response.body.user);
                /*assert.equal( response.body.user.nickname, 'Nep' );
                assert.equal( response.body.user.fullName, 'Nurse' );
                assert.equal( response.body.user.avatar, 'https://static0.fitbit.com/images/profile/defaultProfile_100_male.gif' );
                assert.equal( response.body.user.age, '22' );
                assert.equal( response.body.user.gender, 'FEMALE' );
                assert.equal( response.body.user.weight, '50' );
                assert.equal( response.body.user.height, '165' );*/
                return done();
            });
    });

    it('responds to /edit [UPDATE NICKNAME]', function testEditProfile(done) {
        this.timeout(5000);
        request(server)
            .post('/edit?nickname=Nurse&fullname=Nep&birthday=1990-10-13&weight=55&height=166')
            //.post('/profile?nickname=Nep&fullname=Nurse&birthday=1993-10-13&weight=50&height=165')
            .send(token)
            .expect(200)
            .end(function(err, response){
                assert.ok(!err);
                /*assert.ok( response.body.user !== 'undefined' );
                assert.equal( response.body.user.nickname, 'Nurse' );
                assert.equal( response.body.user.fullName, 'Nep' );
                assert.equal( response.body.user.avatar, 'https://static0.fitbit.com/images/profile/defaultProfile_100_male.gif' );
                assert.equal( response.body.user.age, '25' );
                assert.equal( response.body.user.gender, 'FEMALE' );
                assert.equal( response.body.user.weight, '55' );
                assert.equal( response.body.user.height, '166' );*/
                console.log(response.body.user);
                //console.log(response.body.user.nickname);
                return done();
            });
    });

    it('responds to /activities/date/2016-08-08.json', function testActivity(done) {
        this.timeout(50000);
        request(server)
            .get('/activities/2016/08/08')
            .send(token)
            .expect(200)
            .end(function(err, response){
                assert.ok(!err);
                assert.ok( response.body.summary !== 'undefined' );
                console.log(response.body.summary);
                return done();
            });
    });

    it('responds to /logout', function testlogout(done) {
        request(server)
            .get('/logout')
            .expect(200)
            .end(function(err, response){
                assert.ok(!err);
                return done();
            });
    });



    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});