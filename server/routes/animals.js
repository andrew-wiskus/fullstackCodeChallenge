var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';
var randomNumber = require("./randomnumber.js");



router.get('/', function(req, res) {
    // Retrieve books from database
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('SELECT * FROM animals', function(err, result) {
            done();

            if (err) {
                res.sendStatus(500);
            }

            res.send(result.rows);
        });
    });
});

router.post('/', function(req, res) {
    var animal = req.body;
    // animal.amount = 40;
    animal.amount = randomNumber.randomNumber(0, 100);
    // console.log("rando", randomNumber.randomNumber(0, 100));
    console.log("init animal:", animal);
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
            console.log("wtf?!?@#!@#");
        }

        client.query('INSERT INTO animals (animal_name, animal_amount) ' +
            'VALUES ($1, $2)', [animal.animalType, animal.amount],
            function(err, result) {
                console.log("post animal:", animal);
                done();

                if (err) {
                    res.sendStatus(500)
                    console.log("wtfFFFf?!?@#!@#");
                } else {
                    res.sendStatus(201);
                }
            });
    });
});

module.exports = router;
