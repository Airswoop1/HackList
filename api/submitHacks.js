/**
 * Created by airswoop1 on 5/3/14.
 */
var mongo = require("../mongoDB.js");

var submitHacks = (function(){

    var Request = function(){
        this.title = undefined;
        this.role = undefined;
        this.description = undefined;
        this.apis = undefined;
        this.email = undefined;
    };

    var execute = function(req, res){

        var request = new Request();

        request.title = req.param('title');
        request.role = req.param('role');
        request.description = req.param('description');
        request.apis = req.param('mytext');
        request.email = req.param('email');

        addRequestToDB(request, function(err, result){

            if(err){
                console.log("error on add request to db");
                console.log(err);
                res.send(404);
            }
            else{
                console.log("Successfully added to db");
                console.log(result);
                res.send(200);
            }

        });

    }


    function addRequestToDB(request, callback){
        mongo.getConnection(function(err, db){
            if(err){
                console.log("error connecting to db");
                callback(err);
            }
            else{
                var collection = db.collection('hacks');

                var insert = {};
                insert["title"] = request.title;
                insert["description"] = request.description;
                insert["apis"] = request.apis;
                insert["email"] = request.email;

                collection.insert( insert, function(err, doc){
                    if(err) {
                        console.log("error inserting record in db");
                        callback(err,null);
                    }
                    else {
                        console.log("successfully inserted record in db");
                        console.log(doc);
                        callback(null,doc);
                    }

                })
            }
        })
    }


    return {
        "execute": execute
    }

}())

module.exports = submitHacks;