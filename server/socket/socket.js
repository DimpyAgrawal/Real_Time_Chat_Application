const { Server } = require('socket.io');

let io;
const users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removedUser = (socketId) => {
    console.log(users);
    console.log(socketId);
    const index = users.findIndex((user)=>user.socketId === socketId);
    if(index!==-1){
        users.splice(index,1);
    }
};

const getUser = (userId) => {
    console.log("get User id",userId);
    const matchingUsers = users.filter(user=>user.userId === userId);
        console.log("get User id2",matchingUsers);
    return matchingUsers.length>0 ? matchingUsers[0].socketId:null;
    
};


const sendMessageToUser = async ({ senderId, recieverId, text }) => {
    console.log("sendMessageToUser ",senderId, recieverId, text);
    const SocketIdUser = getUser(recieverId);
    if (SocketIdUser) {
        console.log("sendMessageToUser inside if ",SocketIdUser);
        console.log(senderId, recieverId, text);
        io.to(SocketIdUser).emit("getMessage", {
            senderId,
            text,
        });
    } else {
        console.log("User not found for receiverId : " + recieverId);
    }
};


function setUpSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        //when connect
        console.log("a user connected");

        //take userId and socketId from user
        socket.on("addUser", (userId) => {
            console.log(" inside add user  user_id  "+ userId, "socket_id"+socket.id);
            addUser(userId, socket.id);
            console.log(users);
            io.emit("getUsers", users); //server to client
        });

        //send and get message
        socket.on("sendMessage", ({ senderId, recieverId, text }) => {
            console.log("send Message"+senderId,recieverId,text);
            sendMessageToUser({senderId,recieverId,text});
        });

        //when disconnect
        socket.on("disconnet", () => {
            // if somebody is disconnect from the socker server 
            console.log("a user disconnected");
            // if any disconnection then  remove the user
            removedUser(socket.id);
            console.log(users);
            io.emit("getUsers", users);

        });
    });
}

    module.exports = setUpSocket;