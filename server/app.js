var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// Our routes
var animals = require('./routes/animals');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/animals', animals);



//console.log(randomNumber.randomNumber(1, 9));





app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('server is running on port', app.get('port'));

});
