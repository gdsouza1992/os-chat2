import { Server } from 'http';
import Socket from './socket'

const express = require("express");
const fs = require("fs");
const app = express();
const server = Server(app)
const io = require('socket.io')(server);

const port = process.env.PORT || 3001;
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});





// app.set("port", process.env.PORT || 3001);

// app.use(function (req, res, next) {
//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//         res.setHeader('Access-Control-Allow-Credentials', 'true');
// //         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// //         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//         next();
//     }
// );

// Express only serves static assets in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }



app.get("/chat", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const socket = new Socket(io);
socket.startChatServer();





// io.on('connection',function(client) {
//     console.log('client '+client.id+' connected');

//     client.on('load-conversations', function (data) {
//         console.log('Client sent', data);
//         //get conversations for data
//     });

//     client.on('load-messages', function(data){
//         //get messages for data
//     })

//     client.on('send-message', function(data){
//         //emit to conversation id the message
//     })

//     client.on('send-message', function(data){
//         //emit to conversation id the message
//     })



//     client.on('disconnect', function(){
//         console.log('client '+client.id+' disconnected');
//     });
// });