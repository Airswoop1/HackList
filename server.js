console.log("Initializing... ");

var express = require("express");
var http = require("http");
var path = require("path");
var api = require("./api/api.js");

console.log(api.submitHack);

var app = express();

var server = http.createServer(app);

app.set('port', process.env.PORT || 1337);

app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
//app.use(express.bodyParser());
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static('public'));
//app.use(express.multipart());
//app.set('views', path.join(__dirname, 'views'));


app.get("/",function(req,res){
    res.render('index');
});



app.post("/submitHack", api.submitHack.execute);



server.listen(app.get('port'), function () {
    console.log('listening on port ' + app.get('port') + " started:  ");
    console.log("Completed Node initialization: " + new Date());
});