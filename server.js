var express = require('express');

var app = express();

app.use(express.static(__dirname + '/web'));
app.get('/', function(req, res) {
    res.sendfile('web/site.html');
});

app.listen(8080);
console.log('http://localhost:8080/');