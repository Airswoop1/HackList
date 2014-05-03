console.log("Initializing... ");

var express = require("express");
var http = require("http");
var path = require("path");
var api = require("./api/api.js");

var app = express();

var server = http.createServer(app);

app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.multipart());



app.get("/",api.index.execute);



server.listen(app.get('port'), function () {
    console.log('listening on port ' + app.get('port') + " started:  ");
    console.log("Completed Node initialization: " + new Date());
});