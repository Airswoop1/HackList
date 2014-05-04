/**
 * Created by airswoop1 on 5/3/14.
 */

var api = require('./api/api.js');

var hl_socket = function(server){
    var io = require('socket.io').listen(server);

    io.sockets.on('connection',function(socket){

        socket.on('get_projects',function(data){
            api.getProjects.execute(function(err, documents){
                console.log("Sending the client zee projects");
                 socket.emit('load_projects',{"projects":documents});
            })

        });



        socket.emit('news',{"hello":"world"})




        socket.on('buyer_interested',function(data){

            console.log("received buyer interested");

            var request = {};
            request.buyer_email = data.buyer_email;
            request.hack_title = data.hack_title;
            console.log(request);
           api.notifySeller.execute(request);

        })

    })

};


module.exports = hl_socket;
