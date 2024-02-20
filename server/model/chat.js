//chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');
const {ObjectId} = mongoose.Schema.Types;

const chatSchema = new mongoose.Schema({

    chatName :{
        type: String,
        required: true
    },
    isGroupChat:{
        type: Boolean,
        default: false   
    },
    users:[{
        type:ObjectId,
        ref: "User",
    }],
    lastestMessage:{
        type:ObjectId,
        ref: "Message",
    },
    groupAdmin:{
        type: ObjectId,
        ref:"User",
    }

},{timestamps:true});

module.exports =  mongoose.model("chatSchema",chatSchema);