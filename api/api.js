/**
 * Created by airswoop1 on 5/3/14.
 */
var index = require("./index.js");
var submitHack = require("./submitHacks.js");
var registerUser = require("./registerUser.js");
var notifySeller = require("./notifySeller.js");
var getProjects = require("./getProjects.js");

var api = {
    "index":index,
    "registerUser":registerUser,
    "submitHack":submitHack,
    "notifySeller":notifySeller,
    "getProjects":getProjects
}

module.exports = api;