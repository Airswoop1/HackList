/**
 * Created by airswoop1 on 5/4/14.
 */
var mongo = require("../mongoDB.js");

var getProjects = (function(){


    var execute = function(callback){

        mongo.getConnection(function(err, db){
            if(err){
                console.log("error connecting to db");
                callback(err);
            }
            else{
                var collection = db.collection('hacks');

                var query = {};

                collection.find(query, function(err, cursor){
                    if(err) {
                        console.log("error looking up projects in db");
                        callback(err,null);
                    }
                    else {
                        console.log("successfully looked up projects in db");

                        cursor.toArray(function(err, documents){
                            console.log("Projects found in db:");
                            console.log(documents);

                            callback(null, documents);

                        })


                    }

                })
            }
        })


    }


    return {
        "execute":execute
    }
}());

module.exports = getProjects;