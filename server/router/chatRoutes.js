const express = require('express');
const app = express();
const router = express.Router();
const bcrypt  =  require('bcrypt');
const User  = require('../model/user');
const jwt = require('jsonwebtoken');
const Chat = require('../model/chat');
const Authentication  = require('../middleware/middleware')


router.get("/accessChat/:userId", Authentication,async (req, res) => {
    console.log('inside access request');
    const { userId } = req.params;
    console.log('Chat ID:', userId);
try{
    if(!userId){
        return res.status(400).json({message: "userId params not sent with request"})
     }
        
     var isChat = await Chat.find({
         isGroupChat:false,
         $and:[
             {users:{$elemMatch:{$eq:req.user._id}}},
             {users:{$elemMatch:{$eq:userId}}},
         ],
     }).populate("users","-password")   // we don't want password 
         .populate("lastestMessage")   // we want all info. related to lastestMessage
         
     isChat = await User.populate(isChat[0],{
         path:"lastestMessage.sender",
         select:"name pic email",
     });
 
     
     if (isChat.length > 0) {
         const populatedChat = await User.populate(isChat[0], {   //[0] because with these two users ony one caht array will exist
         
             path: "latestMessage.sender",
             select: "name pic email",
         });
         res.send(populatedChat); // Sending populated chat data
     }
     
     // if chat exist then send the chat data otherwise create the new chat for these two users
    
    
     else {
         const chatData = {
             chatName: "sender",
             isGroupChat: false,
             users: [req.user._id, userId],
         };
         //store  it in the database
 
         const createdChat = await Chat.create(chatData);
             const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
             res.status(200).send(fullChat);
     }
 
         }
         catch(error){
            res.status(400).json({message:error})
        }

});
















module.exports = router;