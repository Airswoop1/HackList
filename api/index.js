/**
 * Created by airswoop1 on 5/3/14.
 */

var index = (function(){

    var execute = function(req, res){
        res.render("views/index.html");
    }

    return{
        "execute":execute
    }

}())

module.exports = index;