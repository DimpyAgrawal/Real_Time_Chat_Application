const express = require('express');
const app = express();
const router = express.Router();
const User = require('../model/user');
const Chat = require('../model/chat');
const Authentication = require('../middleware/middleware')
const Message = require('../model/message')




  // doubt in both 
router.post("/sendMessage", Authentication, async (req, res) => {
    console.log("Inside send message");

    const { content, chatId } = req.body;
    console.log(content + " " + chatId);
    
    if (!content || !chatId) {
        return res.status(400).json({ message: "Invalid data passed into request" });
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId 
    };

    try {
        let message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email"
        });

        await Chat.findByIdAndUpdate(chatId, {
            lastestMessage: message
        });

        res.status(200).json(message);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/allMessages/:chatId",Authentication,async(req,res)=>{
    const {chatId}  = req.params;
    console.log(chatId);

    try{
        const messages = await Message.find({chatId})
        .populate("sender","name","pic","email")
        .populate("chat")
        res.status(200).json(messages);

    }catch(error){
        res.status(400).json(error);
    }

})




////////////////////////////////////////////////////////////////////////////
// second video


//add

router.post('/', async (req, res) => {
    // console.log('indide message api');
    const { conversationId, sender, text } = req.body; 
    // console.log(conversationId, sender, text);
    try {
        
        const newMessage = new Message({ conversationId, sender, text });
        const savedMessage = await newMessage.save();
        // console.log(" herer ",savedMessage);
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(400).json(error);
    }
});

//get

router.get('/:conversationId',async(req,res)=>{
    const{conversationId} = req.params;

    try{
        // console.log('inside messages api');
        // console.log(conversationId);
        const userData = await Message.find({conversationId:conversationId});
        // console.log(userData._id);
        res.status(200).json(userData);
    }catch(error){
        res.status(400).json(error);

    }
})






module.exports = router;