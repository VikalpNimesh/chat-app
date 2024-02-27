const express = require('express');
const app = express();
const PORT = 4000;
const { Server } = require("socket.io");

//New imports
const http = require('http');
const cors = require('cors');

const server = http.createServer(app);

app.use(cors());


const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["POST, GET"],
    },
  });

  let users = []
io.on("connection" , (socket)=>{
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("message" , (data)=>{
        console.log(data);
        io.emit("messageRespond" , data)
    })
    socket.on("newUser" , (data)=>{
        // console.log(data);
        users.push(data)
        console.log(users);
        io.emit("newUserResponse" , users)
    })


    socket.on("disconnect", ()=>{
        console.log('🔥: A user disconnected');

        users = users.filter((user)=> user.socketID !== socket.id)
        console.log(users);
        io.emit('newUserResponse', users);
        socket.disconnect();

    })
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});