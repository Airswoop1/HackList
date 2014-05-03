/**
 * Created by airswoop1 on 5/3/14.
 */
var MongoClient = require('mongodb').MongoClient;
var mongo_url = "mongodb://HackList:wIdmKTBfbm3Ji1VzIDV93tWdlfdf6i.qgnVizVCjRO4-@ds031088.mongolab.com:31088/HackList";
var mongoDatabase;

function getConnection(callback) {

    if (mongoDatabase) {
        callback(null,mongoDatabase);
    }
    else {
        console.log("Connecting to mongo database...");

        MongoClient.connect(mongo_url, function(err,db) {
            if(err) {
                console.log("Unable to connect to Mongo database.");
                mongoDatabase = null;
                callback(err, null);
            }
            else {
                console.log("Connected to Mongo database.");
                mongoDatabase = db;
                callback(null, mongoDatabase);
            }
        });
    }
};

module.exports.getConnection = getConnection;
