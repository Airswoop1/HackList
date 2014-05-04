/**
 * Created by airswoop1 on 5/3/14.
 */

var hl_socket = function(server){
    var io = require('socket.io').listen(server);

    io.sockets.on('connection',function(socket){

        socket.emit('news',{"hello":"world"})

        socket.on('buyer_interested',function(data){

            console.log(data);

        })

    })

};


module.exports = hl_socket;
