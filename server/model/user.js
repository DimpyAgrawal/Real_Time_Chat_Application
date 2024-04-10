const mongoose = require('mongoose');
const  {ObjectId} = mongoose.Schema.Types ;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
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
   likedUser:{
    type :  [ObjectId],
    ref : 'UserChat',

   },
      likedCard:{
        type : [ObjectId],
        ref : 'UserChat',
      },

      friend :{
        type : [ObjectId],
        ref : 'UserChat',
        
      }
    },
    { timestamps : true });

module.exports = mongoose.model('userChat', userSchema);
