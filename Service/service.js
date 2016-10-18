var express = require('express');
var routers = express.Router();
var axios = require('axios');
var app = express();

var FitbitApiClient = require("../fitbit-api-client.js"),
    client = new FitbitApiClient("227MDW", "c41e34a027cd3eab701d080c3067d0b2");

var requestify = require('requestify');

/* GET home page.  localhost/   */
routers.get('/', function (req, res, next) {
    res.render('index', {title: 'Fit-Keeper'});
});

routers.get('/logout', function (req, res, next) {
    res.render('profile', {title: 'Show profile'});
});

//  localhost/authorize
routers.get("/authorize", function (req, res) {
    res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/callback'));
});

routers.get("/callback", function (req, res) {
    var sess = req.session;

    client.getAccessToken(req.query.code, 'http://localhost:3000/callback').then(function (result) {
        //client.get("/profile.json", result.access_token).then(function (results) {
        //  //console.log(results);
        //  res.render('profile', results[0]);
        //  //res.send(results[0]);
        //});
        sess.token = result;
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});


routers.get("/profile", function (req, res) {
    var token = req.session.token;
    if(req.body.token) {
        token = req.body.token;
    }
    client.refreshAccesstoken(token).then(function (result) {
        req.session.token = result;
        client.post("/profile.json", result.access_token
        ).then(function (results) {
            //console.log(results);
            //res.render('profile', results[0]);
            res.send(results[0]); //use

        });

    }).catch(function (error) {
        res.send(error);
    });

});

routers.post("/edit", function (req, res) {
    var token = req.session.token;
    if(req.body.token) {
        token = req.body.token;
    }
    var nickname = req.query.nickname;
    var fullname = req.query.fullname;
    var birthday = req.query.birthday;
    var weight = req.query.weight;
    var height = req.query.height;
    client.refreshAccesstoken(token).then(function (result) {
        req.session.token = result;
        requestify.request(getUrl('/profile.json', '-'), {
                method: 'POST',
                params: {
                    nickname: nickname,
                    fullname: fullname,
                    birthday: birthday,
                    weight: weight,
                    height: height
                },
                headers: {
                    Authorization: 'Bearer ' + result.access_token
                },
                dataType: 'json'
            })
            .then(function(response) {
                // get the response body
                response.getBody();

                // get the response headers
                response.getHeaders();

                // get specific response header
                response.getHeader('Accept');

                // get the code
                response.getCode();

                // Get the response raw body

                res.send(JSON.parse(response.body));
            });

    }).catch(function (error) {
        res.send(error);
    });

});

routers.get("/activities/:year/:month/:day", function (req, res) {
    var token = req.session.token;
    var date = req.params.year + '-' + req.params.month + '-' + req.params.day;
    if(req.body.token) {
        token = req.body.token;
    }
    client.refreshAccesstoken(token).then(function (result) {
        req.session.token = result;
        client.get("/activities/date/" + date + ".json", result.access_token
        ).then(function (results) {
            //console.log(results);
            //res.render('profile', results[0]);
            res.send(results[0]);
        });

    }).catch(function (error) {
        res.send(error);
    });

});

function getUrl(path, userId) {
    return url = 'https://api.fitbit.com/1/user/' + (userId || '-') + path;
}

module.exports = routers;
