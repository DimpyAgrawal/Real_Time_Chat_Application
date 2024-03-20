const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const Chat = require('../model/chat');
const Authentication = require('../middleware/middleware')
const message = require('../model/message')

//accessing one on one chat

router.get("/accessChat/:userId", Authentication, async (req, res) => {
    console.log('inside access request');
    const { userId } = req.params;
    console.log('Chat ID:', userId);

    if (!userId) {
        return res.status(400).json({ message: "userId params not sent with request" });
    }

    try {
        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        }).populate("users", "-password")   // we don't want password 
            .populate("lastestMessage");     // we want all info. related to lastestMessage

        console.log(isChat);
        if (isChat.length > 0) {
            isChat = await User.populate(isChat[0], {             //[0] because with these two users ony one chat array will exist
                path: "lastestMessage.sender",
                select: "name pic email",
            });

            res.send(isChat); // Sending populated chat data
        } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };
                 //store  it in the database
            const createdChat = await Chat.create(chatData);
             // now sending the chat data to the user which is created now
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(fullChat);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// find all the chats on a particular user
router.get("/accessAllChats", Authentication, async (req, res) => {

    try {
        let isChat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("isGroupChat", "-password")
            .populate("lastestMessage")
            .sort({ updatedAt: -1 }) // it will show in stack manner;
        isChat = await User.populate(isChat, {
            path: "lastestMessage.sender",
            select: "name pic email",
        })

        console.log(isChat);
        res.status(200).json(isChat);

    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//create the group chat

router.post("/createGroupChat",Authentication,async(req,res)=>{
    console.log("inside creategroupChat");
    if(!req.body.users || !req.body.name){
        return res.status(400).json({message:"please fill all the fields"})
    }
    let users = JSON.parse(req.body.users) // data will change into the js object
    if(users.length<2) 
        return res.status(400).send("more than two users are required to form a group chat")

    users.push(req.user); 

    try{
        const groupChat = await Chat.create({
            chatName: req.body.name ,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user, 
        });

        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
            .populate("users","-password")
            .populate("groupAdmin","-password");
        
        res.status(200).json(fullGroupChat);

    }catch(error){
        res.status(400).json({message:error})
    }


});

//rename the group

router.put("/renameGroup",Authentication,async(req,res)=>{
    console.log("inside rename group");
    const { chatId, chatName} = req.body;
    console.log(chatId,+" "+chatName);

    if (!chatId || !chatName) {
        return res.status(400).json({ message: "chatId and chatName are required in the request body" });
    }
    try{

        const updatedChat = await Chat.findByIdAndUpdate(chatId,{chatName:chatName},{new:true})
            .populate("users","-password") 
            .populate("groupAdmin","-password");
        
            res.status(200).json(updatedChat);
    }catch(error){
        res.status(400).json({message:error});

}});


//remove user from the group 

router.put("/removeFromGroup",Authentication,async(req,res)=>{
    const {chatId, userId} = req.body;

    try{ 
        const removedUser =  await Chat.findByIdAndUpdate(chatId,
            { $pull:{users:userId} },{new:true}
            ).populate("users","-password")
                .populate("groupAdmin","-password");
            
        res.status(200).json(removedUser);

    }catch(error){
        res.status(200).json({message:error});
    }

});

// add to the group

router.put("/addTOGroup",Authentication,async(req,res)=>{
    const {chatId, userId} = req.body;

    try{ 
        const addedUser =  await Chat.findByIdAndUpdate(chatId,
            { $push:{users:userId} },{new:true}
            ).populate("users","-password")
                .populate("groupAdmin","-password");
            
        res.status(200).json(addedUser);

    }catch(error){
        res.status(200).json({message:error});
    }
})

















module.exports = router;