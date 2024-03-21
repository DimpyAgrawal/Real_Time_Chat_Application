const express = require('express');
const app = express();
const router = express.Router();
const Conversation = require('../model/conversation');


//new conversation

router.post('/',async(req,res)=>{
    const {senderId,receiverId} = req.body;
    const newConversation = new Conversation({
        members:[senderId,receiverId]
    })
    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);

    }catch(error){
        res.status(400).json("error in the new converstion"+error)
    }
});

//get conversation of the user

router.get('/:userId',async(req,res)=>{
    const{userId} = req.params;

    try{

        const userData = await Conversation.find({
            members :{$in:[userId]},
        });
        res.status(200).json(userData);

    }catch(error){
        res.status(400).json("erro inconversation of the user"+ error);
    }
})






module.exports = router;