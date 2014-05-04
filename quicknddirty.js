/**
 * Created by airswoop1 on 5/4/14.
 */


var api = require("./api/api.js");

(function upload(){

   var toUpload = [
       //["./screenshots/prodee.png",'prodee.png'],
       //["./screenshots/wisconsin.png", 'wisconson.png']
       //["./screenshots/voiceup.png", 'voiceup.png']
       //["./screenshots/hacklist.png","hacklist.png"]
       ["./screenshots/aaron.jpg","aaron.jpg"]
   ];

    for(var u in toUpload){
        api.submitHack.uploadHackImageToBlob(toUpload[u][0],toUpload[u][1]);
    }
    console.log("finished uploading");


}());