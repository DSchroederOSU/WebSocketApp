var express = require('express');
var ws = require('./ws');



var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/ws.html');
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/ws.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

