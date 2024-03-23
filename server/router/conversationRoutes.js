const express = require('express');
const app = express();
const router = express.Router();
const Conversation = require('../model/conversation');


//new conversation

router.post('/',async(req,res)=>{
    const {senderId,receiverId} = req.body;
    try{
        const newConversation = new Conversation({
            members:[senderId,receiverId]
        });
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);

    }catch(error){
        res.status(400).json("error in the new converstion"+error)
    }
});

//get conversation of the user

router.get('/:userId',async(req,res)=>{
    const{userId} = req.params;
    console.log(userId);

    try{

        const userData = await Conversation.find({
            members :{$in:[userId]},
        });
        console.log(userData);
        res.status(200).json(userData);

    }catch(error){
        res.status(400).json("erro inconversation of the user"+ error);
    }
})


//get conversation includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    const { firstUserId, secondUserId } = req.params;
    console.log(firstUserId, secondUserId);
    try {
        let conversation = await Conversation.findOne({
            members: { $all: [firstUserId, secondUserId] },
        });

        if (!conversation) {
            console.log("No existing conversation found, creating a new conversation");
            const newConversation = new Conversation({
                members: [firstUserId, secondUserId]
            });
            conversation = await newConversation.save();
        }
        console.log(conversation._id);
        res.status(200).json(conversation);

    } catch (error) {
        res.status(400).json(error);
    }
});





module.exports = router;