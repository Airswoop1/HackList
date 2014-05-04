/**
 * Created by airswoop1 on 5/3/14.
 */
var mongo = require("../mongoDB.js");

var notifySeller = (function(){

    var Request = function(){
        this.buyer_email = undefined;
        this.seller_email = undefined;
        this.hack_title = undefined;
    }

    var execute = function(req){

        var request = new Request();
        request.buyer_email = req.buyer_email;
        request.seller_email = req.seller_email;
        request.hack_title = req.hack_title;

        checkIfAlreadyInterested(request, function(err, alreadyInterested){

            if(err){
                console.log("error on check if already Interested");
                console.log(err);

            }
            else if(alreadyInterested){
                //do nothing cuz he's already interested
            }
            else{

                sendSellerNotification(request, function(s_err){

                    if(s_errerr){
                        console.log("error on send seller notification");
                        console.log(s_err)
                    }
                    else{

                        updateHackThatUserIsInterested(request, function(u_err){

                            if(u_err){
                                console.log("error on update hack that user is interested");
                                console.log(u_err);
                            }

                        })

                    }

                })

            }
        })

    }

    function checkIfAlreadyInterested(req, callback){

        mongo.getConnection(function(err, db){
            if(err){
                console.log("error connecting to db");
                callback(err);
            }
            else{
                var collection = db.collection('hacks');

                var hack_title = req.hack_title;

                var query = {};

                query[]


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
        "execute":execute
    }

}())

module.exports = notifySeller;