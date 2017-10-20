var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var bear = require('app/models/bear');


mongoose.connect('mongodb://localhost:27107'); // pass in uri to mongodb database

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hello world!' });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);