/**
 * Created by airswoop1 on 5/3/14.
 */
var mongo = require("../mongoDB.js");
var request = require("request");

var notifySeller = (function(){

    var Request = function(){
        this.buyer_email = undefined;
        this.seller_email = undefined;
        this.hack_title = undefined;
    }

    var execute = function(req){

        var request = new Request();
        request.buyer_email = req.buyer_email;
        request.hack_title = req.hack_title;

        checkIfAlreadyInterested(request, function(err, alreadyInterested,doc){
            if(doc.hack_email){
                request.seller_email = doc.hack_email;
            }
            if(err){
                console.log("error on check if already Interested");
                console.log(err);

            }
            else if(alreadyInterested){
                console.log("Buyer is already interested");
            }
            else{

                sendSellerNotification(request, function(s_err){

                    if(s_err){
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

                var query = {};
                query['title'] = req.hack_title;
                //query['interested'] = req.buyer_email;

                collection.findOne(query, function(err, doc){
                    if(err) {
                        console.log("error finding hack in db");
                        callback(err,false,null);
                    }
                    else {
                        console.log(doc);
                        console.log(req.buyer_email);
                        if(doc.interested.indexOf(req.buyer_email)>-1){
                            callback(null,true,doc);
                        }
                        else{
                            callback(null,false, doc);
                        }


                    }

                })
            }
        })

    }

    function sendSellerNotification(req, callback){

        var form_data = {};
        form_data.from = "hacklist.io@gmail.com";
        form_data.to = req.seller_email;
        form_data.subject = "HackList.io - You have an interested buyer!";
        var text = "Hi! Someone on HackList.io has shown interest in " + req.hack_title + ". Let us know if you're interested in getting in touch with them! In the meantime we'll screen them to make sure they're not a thief.";

        var auth = {};
        auth[''] = "";
        //auth['sendImmediately'] = false;

        var url = "https://api.mailjet.com/v3/send";

        var r = request.post(url);
        var form = r.form();
        form.append("from","hacklist.io@gmail.com");
        form.append("to",req.seller_email);
        form.append("subject","HackList.io - You have an interested buyer!");
        form.append("text",text);
        r.auth("a01b397d9f826512637c0644cc1b27e9","a1280d54c33f61dad389c50236186af3");

        callback(null);
    }

    function updateHackThatUserIsInterested(req, callback){
        mongo.getConnection(function(err, db){
            if(err){
                console.log("error connecting to db");
                callback(err);
            }
            else{
                var collection = db.collection('hacks');
                console.log("Trying to update the hack that the user is interested");
                var query = {};
                query['title'] = req.hack_title;

                var update = {};
                update['$push'] = {"interested":req.buyer_email};

                collection.findAndModify(query,[],update, function(err, doc){
                    if(err) {
                        console.log("error updating hack in db");
                        callback(err,null);
                    }
                    else {
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