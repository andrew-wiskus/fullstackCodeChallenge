var express = require('express');
var router = express.Router();

exports.randomNumber = function(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
};
