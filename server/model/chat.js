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
        type:ObjectId,  // only contains id
        ref: "userChat",
    }],
    lastestMessage:{
        type:ObjectId,
        ref: "messageSchema",
    },
    groupAdmin:{
        type: ObjectId,
        ref:"userChat",
    }

},{timestamps:true});

module.exports =  mongoose.model("chatSchema",chatSchema);