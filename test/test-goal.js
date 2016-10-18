var request = require('supertest'),
    assert = require('assert'),
    express = require('express'),
    //app = express(),
    session = require('express-session');
//var port = process.env.PORT || 8080;
//var server = require('http').createServer(app);
describe('loading express', function () {
    var server;
    beforeEach(function () {
        //server.listen(80)
        server=require('../app');

    });

    it('responds to /viewgoal', function testViewGoal(done) {
        request('http://localhost:8080')
            .get('/viewgoal')
            //.get('/viewgoal')
            .expect(200)
            .end(function(err, response){
                assert.ok(!err);
                assert.ok( response.body !== 'undefined' );
                console.log(response.body);
                return done();
            });

    });

    it('responds to /insertgoal [UPDATE GOAL]', function testInsertCaloriesGoal(done) {
        this.timeout(5000);
        request('http://localhost:8080')
            //.get('/viewgoal')
            .get('/insertgoal?goalType=Calories&customerID=4KRGQ5&activityID=1&calories=200')
            .expect(200)
            .end(function(err, response){
                assert.ok(!err);
                assert.ok( response.body !== 'undefined' );
                console.log(response.body);
                return done();
            });

    });

    it('responds to /insertgoal [UPDATE GOAL]', function testInsertTimeGoal(done) {
        this.timeout(5000);
        request('http://localhost:8080')
        //.get('/viewgoal')
            .get('/insertgoal?goalType=Time&customerID=4KRGQ5&timeActivityID=1&hour=2&minute=30')
            .expect(200)
            .end(function(err, response){
                assert.ok(!err);
                assert.ok( response.body !== 'undefined' );
                console.log(response.body);
                return done();
            });

    });

    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });


});

