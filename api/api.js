/**
 * Created by airswoop1 on 5/3/14.
 */
var index = require("./index.js");
var submitHack = require("./submitHacks.js");

var api = {
    "index":index,
    "submitHack":submitHack
}

module.exports = api;