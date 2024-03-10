const mongoose = require('mongoose');

 const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type: String,
        required: true,
        default:"https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
    },
    friend_request : {
            type : Array,
    },
    friend_list:{
        type : Array,
    },
 },{timestamps : true});

const UserChat = mongoose.model('userChat', userSchema);

module.exports = UserChat;