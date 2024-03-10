const mongoose = require('mongoose');
const User = require('./user');
const Chat = require('./chat');
const {ObjectId} = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
    sender :{
        type: ObjectId,
        ref:"userChat"
    },
    content:{
        type: String,
        trim: true
    },
    chat:{
        type: ObjectId,
        ref: "chatSchema"
    }

},{timestamps:true})

module.exports = mongoose.model("messageSchema",messageSchema);