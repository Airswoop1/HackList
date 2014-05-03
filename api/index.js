/**
 * Created by airswoop1 on 5/3/14.
 */

var index = (function(){

    var execute = function(req, res){
        console.log("HI");
        res.send(200)
    }

    return{
        "execute":execute
    }

}())

module.exports = index;