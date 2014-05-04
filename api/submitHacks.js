/**
 * Created by airswoop1 on 5/3/14.
 */
var mongo = require("../mongoDB.js");
var azure = require("azure");
var account = "hackimages";
var storage_key = "d8Wwe5St8qCGYCD432JiWJsC/ENNZydUlCEV/0V0qfum6vigF/k7zK3MpZpocXliMSpLd/tAhpSVPWMKmC8rFg==";

var submitHacks = (function(){

    var Request = function(){
        this.title = undefined;
        this.description = undefined;
        this.apis = undefined;
        this.industry = undefined;
        this.languages = undefined;
        this.frameworks= undefined;
        this.ask_price = undefined;
        this.github_url = undefined;
        this.linkedin_url = undefined;
        this.additional_info = undefined;
        this.consulting = undefined;

    };

    var execute = function(req, res){

        var image_file_name = req.param('title').replace(/\W/g, '').replace(/ /g,'') + "_" + req.files.hack_image.originalFilename;
        console.log(image_file_name);
        if(req.files.hack_image.size > 0){
            uploadHackImageToBlob(req, image_file_name);
        }

        var request = new Request();

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
        request.image_location = "http://hackimages.blob.core.windows.net/images/"+image_file_name;
        addHackToDB(request, function(err, result){

            if(err){
                //error would be on duplicate entry in db, handle message back accordingly.
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


    function addHackToDB(request, callback){
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
                insert["industry"] = request.industry;
                insert["languages"] = request.languages;
                insert["frameworks"]= request.frameworks;
                insert["ask_price"] = request.ask_price;
                insert["github_url"] = request.github_url;
                insert["linkedin_url"] = request.linkedin_url;
                insert["additional_info"] = request.additional_info;
                insert["consulting"] = request.consulting;

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


    function uploadHackImageToBlob(req, image_file_name){

        var file_location = req.files.hack_image.path;

        var blobService = azure.createBlobService(account, storage_key);
        blobService.createBlockBlobFromFile("images", image_file_name, file_location, function(error){
            if(error){
                console.log("Error adding image upload");
            }
            else{
                console.log("successfully added image!");
            }
        });

    }


    return {
        "execute": execute,
        "addhackToDB" : addHackToDB
    }

}())

module.exports = submitHacks;