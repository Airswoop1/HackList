/**
 * Created by airswoop1 on 5/3/14.
 */
var api = require('./api.js');
var bcrypt = require('bcrypt');
var mongo = require('../mongoDB.js');

var registerUser = (function(){

    var Request = function(){
        //user info
        this.email = undefined;
        this.password = undefined;
        this.role = undefined;
        this.name = undefined;
        this.company = undefined;
        this.website = undefined;
        this.location = undefined;
        this.bio = undefined;


        //buyer specific
        this.budget = undefined;
        this.buyer_industries = undefined;
        this.buyer_additonal_info = undefined;
        this.experience = undefined;

        //hack info
        this.title = undefined;
        this.description = undefined;
        this.apis = undefined;
        this.industry = undefined;
        this.languages = undefined;
        this.frameworks = undefined;
        this.ask_price = undefined;
        this.twitter_handle = undefined;
        this.github_url = undefined;
        this.linkedin_url = undefined;
        //this.team_members = undefined;
        this.additional_info = undefined;
        this.consulting = undefined;
        this.image = undefined;

    }

    function populateRequestObject(req){

        var request = new Request();

        request.email = req.param('email');
        request.password = req.param('password')
        request.role = req.param('role');
        request.name = req.param('name');
        request.company = req.param('company');
        request.website = req.param('website');
        request.location = req.param('location')
        request.bio = req.param('bio');

        request.budget = req.param('budget');
        request.buyer_industries= req.param('buyer_indstries');
        request.buyer_additonal_info = req.param('buyer_additional_info');
        request.experience = req.param("experience");

        request.title = req.param('title');
        request.description = req.param('description')
        request.apis = req.param('apis');
        request.industry = req.param('industry');
        request.languages = req.param('languages');
        request.frameworks= req.param('frameworks');
        request.ask_price = req.param('twitter_handle');
        request.github_url = req.param('github_url');
        request.linkedin_url = req.param('linkedin_url');
        request.additional_info = req.param('additional_info');
        request.consulting = req.param('consulting');


        return request;


    }


    var execute = function(req,res){

        var request = populateRequestObject(req);

        if(request.image){
            uploadImageToBlobStorage(request.image);
        }

        bcrypt.genSalt(10, function(err, salt) {

            bcrypt.hash(request.password, salt, function(err, hash) {

                // Store hash in your password DB.
                request.password = hash;

                addUserToDB(request, function(err, result_of_add_user){

                    if(err) {
                        console.log("error adding user to db");
                        res.send(404);
                    }
                    else {

                        if(request.role == 'hacker' && typeof request.title !== undefined){
                            api.submitHack.addhackToDB(request, function(hack_err,result){
                                if(hack_err){
                                    //need to handle dupes here as well
                                    console.log("Error on adding hack to db");
                                    res.send(404);
                                }
                                else{
                                    console.log("successfully added seller and their hack to to db ");
                                    res.send(200);
                                }
                            })
                        }
                        else{
                            console.log("successfully added buyer to db!")
                            res.send(200);
                        }

                    }

                })
            });
        });

    }

    function addUserToDB(request, callback){

        mongo.getConnection(function(err, db){
            if(err){
                console.log("error connecting to db");
                callback(err);
            }
            else{
                var collection = db.collection('users');

                var insert = {};
                insert["email"] = request.email;
                insert["password"] = request.password;
                insert["role"] = request.role;
                insert["name"] = request.name;
                insert["company"] = request.company;
                insert["website"] = request.website;
                insert["location"] = request.location;
                insert["bio"] = request.bio;

                if(request.role === 'buyer'){
                    insert["budget"] = request.budget;
                    insert["buyer_industries"]= request.buyer_industries;
                    insert["buyer_additonal_info"] = request.buyer_additonal_info;
                    insert["experience"] = request.experience;
                }

                insert["last_modified"] = new Date().getTime();

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

}());

module.exports = registerUser;
