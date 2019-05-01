const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {genrateMessage,genrateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const app = express();
const server = http.createServer(app);
const io = socketIO(server)
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection',(socket)=>{

    socket.on('createMessage',(data,callBackFunction)=>{
        io.emit('newMessage',genrateMessage(data.from,data.text));
        callBackFunction('from the server');
    })
    socket.on('createLocationMessage',(coords)=>{
        io.emit('createLocationMessage',genrateLocationMessage(coords.from,coords.latitude ,coords.longitude));
    });
    socket.on('join',(nameAndRoom,callBackFunction)=>{
        if(!isRealString(nameAndRoom.name)|| !isRealString(nameAndRoom.room)){
            callBackFunction('Name and Room is required !');
        }
        socket.join(nameAndRoom.room);
        socket.emit('newMessage',genrateMessage('Admin','Welcome to Our Chat App'));
        socket.broadcast.to(nameAndRoom.room).emit('newMessage',genrateMessage('Admin' , `${nameAndRoom.name} has joined the chat room`));
        callBackFunction();
    })
    socket.on('disconnect',()=>{
        console.log('the user disconnect the server');
    });
    
});

server.listen(port,()=>{
    console.log(`started on port : ${port} `)
})