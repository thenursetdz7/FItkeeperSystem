var express = require('express');
var mysql= require('mysql');
var app = express();
//var router2 = express.Router();

//connectdb
var connection = mysql.createConnection({
    //properties...
    host:'localhost',
    user:'root',
    password:'',
    database:'fitkeeper'
});

connection.connect(function (error) {
    if(!!error){
        console.log('Error');
    }
    else {
        console.log('Connected');
    }
});

//db

app.get('/viewgoal',function (req, resp) {

    //about mysql

    connection.query("SELECT * FROM setgoal AS s " +
        "LEFT JOIN caloriesgoal AS c ON c.setGoalID = s.setGoalID " +
        "LEFT JOIN timegoal AS t ON t.setGoalID = s.setGoalID", function (error, rows, fields) {
        //connection.query("SELECT * FROM goals WHERE missionName = 'a' ",function (error, res) {

        if (!!error) {
            console.log('Error in the query');
        }
        else {
            //console.log('Successful query \n');
            //console.log(rows);
            resp.send(rows);
            //parse with your rows/fields
        }
    });


        //resp.send(r);
        //console.log(r);
    //resp.send(r);



    //resp.json(r);


    /* //var post  = {missionName: 'Test2', goalName: 'step',amouthGoal: 1000};
     var post  = {missionName: 'Test', goalName: 'step',hourGoal: 2, minuteGoal:20};
     //var post  = {missionName: 'Test3', goalName: 'step',caloriesGoal: 2000};
     var qe=connection.query('INSERT INTO goalTable SET ?', post, function(err, result) {
     // Neat!
     })
     console.log(qe.sql); */

});


//http://localhost:8080/insertgoal?goalType=Calories&customerID=4KRGQ5&activityID=1&calories=250 << URL
//http://localhost:8080/insertgoal?goalType=Time&customerID=testttttt&timeActivityID=1&hour=2&minute=45 << URL


//ยังใช้ไม่ได้นะ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
app.get('/insertgoal',function (req,resp) {
    var customerID=req.query.customerID; //get from client part
    var enable=1;
    var achieve=0;
    var goalType=req.query.goalType;
    var activityID=req.query.activityID;
    var calories=req.query.calories;
    var timeActivityID=req.query.timeActivityID;
    var minute=req.query.minute;
    var hour=req.query.hour;
    //about mysql
    connection.query("SELECT * FROM setgoal",function (error, rows,fields) {

       /* INSERT INTO tab_student
        SET name_student = 'Bobby Tables',
            id_teacher_fk = (
                SELECT id_teacher
        FROM tab_teacher
        WHERE name_teacher = 'Dr. Smith')*/

        if(!!error){
            console.log('Error in the query');
        }
        else {
            console.log('Successful query \n');
            //console.log(rows);
            //parse with your rows/fields
        }
    })
     if(goalType==="Calories"){
        var post  = {customerID: customerID, enable:enable ,achieve:achieve};
        //var p ={goalName:'running'};

        /* INSERT INTO `setgoal` (`setGoalID`, `customerID`, `goalID`, `hourGoal`, `minuteGoal`, `caloriesGoal`)
         VALUES (NULL, '4KRGQ5', '2', '', '', '200');*/

         var qe=connection.query('INSERT INTO setgoal SET ?', post, function(err, result) {
            connection.query("SELECT * FROM setgoal ORDER BY setGoalID DESC ",function (error, rows,fields) {
            var sid =rows[0].setGoalID;

            var post2  = {setGoalID: sid, activityID: activityID, calories:calories};
            var qe=connection.query('INSERT INTO caloriesgoal SET ?', post2, function(err, result) {
            // Neat!
            })
        })
        // Neat!
         })
         //console.log(qe.sql);
         connection.query("SELECT * FROM setgoal AS s " +
            "LEFT JOIN caloriesgoal AS c ON c.setGoalID = s.setGoalID " +
            "LEFT JOIN timegoal AS t ON t.setGoalID = s.setGoalID", function (error, rows, fields) {
              //connection.query("SELECT * FROM goals WHERE missionName = 'a' ",function (error, res) {

             if (!!error) {
                console.log('Error in the query');
             }
            else {
                //console.log('Successful query \n');
                //console.log(rows);
                resp.send(rows);
                //parse with your rows/fields
            }
        });
     }
     else if(goalType==="Time"){
         var post  = {customerID: customerID, enable:enable ,achieve:achieve};
         //var p ={goalName:'running'};

         /* INSERT INTO `setgoal` (`setGoalID`, `customerID`, `goalID`, `hourGoal`, `minuteGoal`, `caloriesGoal`)
          VALUES (NULL, '4KRGQ5', '2', '', '', '200');*/

         var qe=connection.query('INSERT INTO setgoal SET ?', post, function(err, result) {
             connection.query("SELECT * FROM setgoal ORDER BY setGoalID DESC ",function (error, rows,fields) {
                 var sid =rows[0].setGoalID;

                 var post2  = {setGoalID: sid, timeActivityID: timeActivityID, hour:hour, minute:minute};
                 var qe=connection.query('INSERT INTO timegoal SET ?', post2, function(err, result) {
                     // Neat!
                 })
             })
             // Neat!
         })
         //console.log(qe.sql);
         connection.query("SELECT * FROM setgoal AS s " +
             "LEFT JOIN caloriesgoal AS c ON c.setGoalID = s.setGoalID " +
             "LEFT JOIN timegoal AS t ON t.setGoalID = s.setGoalID", function (error, rows, fields) {
             //connection.query("SELECT * FROM goals WHERE missionName = 'a' ",function (error, res) {

             if (!!error) {
                 console.log('Error in the query');
             }
             else {
                 //console.log('Successful query \n');
                 //console.log(rows);
                 resp.send(rows);
                 //parse with your rows/fields
             }
         });
     }

});


app.listen(8080);
//router2.listen(1337);
//module.exports = router2;
