/**
 * Created by Tundaey on 6/24/2015.
 */
var socketioJwt = require('socketio-jwt');
var config = require('../../config');
module.exports = function(io){
   /*var chat = io.of('/chat')
       .use(socketioJwt.authorize({
        secret: config.jwtsecret,
        timeout: 15000,
        handshake: true
    }))
       .on('connection', function(socket){
       console.log('helo ' + socket.decoded_token.id);
   });*/

    io.on('connection', socketioJwt.authorize({
        secret: config.jwtsecret,
        timeout: 15000
    })).on('authenticated', function(socket){
        channelID = socket.decoded_token.id;
        console.log('hello ' + channelID);
        socket.join(channelID);
        //socket.join('lobby')
        console.log('connected to my channel')
        socket.on('chat', function(data){
            console.log(data);
            console.log(data.to);
            io.to(data.to).emit('chatter', data);
           //io.to('lobby').emit('chatter', {from: 'lobby', messageObj: data })
            console.log(data);

        })

    })

    /*var  chat = io.of('/chat').on('connection', function(socket){
        //console.log('connecting', socket.handshake.decoded_token.name);

        //console.log(socket.token.id + ' Just joined');
        socket.on('start chat', function(data){
            var doc_id = data.id.toString();
            var user_id = socket.token.id.toString();
            var roomID = user_id + doc_id;
            socket.join(roomID);
            //chat.in().emit({roomID: roomID})
        });

        socket.on('send message', function(data){
            var roomID = data.roomID;

            chat.in(roomID).emit({msg: data.msg});
        })

        socket.on('send message', function(data){
            chat.in().emit({msg: data.msg, patient: socket.token.id});
            var newMsg = new Message();
            newMsg.doctor = data.id;
            newMsg.patient = socket.token.id;
            newMsg.message = data.msg;
            newMsg.save();
        });

        socket.on('services history', function(data){
            var query = Message.find({doctor: data.id, patient: socket.token.id}).limit(10);
            query.exec(function(err, msgs){
                if(err){
                    console.log(err);
                    socket.to(data.id).emit(new Error('There was an error retrieving messages'));
                }
                socket.to(data.id).emit({msg: msgs});
            });
        });
    });*/
}