const express = require('express');
const app = express();
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    console.log(name + " " + email + " " + password);
    if (!name || !email || !password) {
        return res.send({ error: "Fill Complete details" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        console.log(name + " " + email + " " + password);

        const oldUser = await User.findOne({ email });

        
        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, 
        });

        return res.json({ data: "Registered Successfully!" });
    } catch (error) {
        return res.status(500).json({ data: "Error occurred while registering user", error });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const exist = await User.findOne({ email });
        if (!exist) {
            console.log("User does not exist");
            return res.status(400).send("User does not exist");
        }

        const match = await bcrypt.compare(password, exist.password);
        if (!match) {
            console.log("Password does not match");
            return res.status(400).send("Password does not match"); 
        }

        const token = jwt.sign({ email: exist.email, name: exist.name, pic: exist.pic }, process.env.JWT_SECRET);
        console.log("Login successful");
        return res.send({
            msg: "Login Successfully",
            data: token
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: "error",
            msg: "An error occurred while login" 
        });
    }
});

router.post('/send_request', async (req, res) => {
    const { recId , senderId } = req.body;
    console.log(recId, senderId);
    try {
        const receiver = await User.findOne({ _id: recId });
        const sender = await User.findOne({ _id: senderId });
        if (!receiver || !sender) {
            return res.status(404).send("One or more users not found!");
        }
        receiver.friend_request.push(senderId);
        await receiver.save();

        res.status(200).send("Friend request sent successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});


router.post('/accept_request', async(req, res) => {
    const { recId, senderId } = req.body;
    try {
        const receiver = await User.findOne({ _id: recId });
        const sender = await User.findOne({ _id: senderId });
        if (!receiver || !sender) {
            return res.status(404).send("One or more users not found!");
        }
        receiver.friend_list.push(senderId);
        sender.friend_list.push(recId);

        receiver.friend_request.pull(senderId);

        await receiver.save();
        await sender.save();

        res.status(200).send("Friend request accepted successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

router.post('/delete_request', async(req, res) => {
    const { recId, senderId } = req.body;
    try {
        const receiver = await User.findOne({ _id: recId });
        const sender = await User.findOne({ _id: senderId });
        if (!receiver || !sender) {
            return res.status(404).send("One or more users not found!");
        }

        receiver.friend_request.pull(senderId);

        await receiver.save();

        res.status(200).send("Friend request deleted successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});


router.post('/unfriend', async(req, res) => {
    const { recId, senderId } = req.body;
    try {
        const receiver = await User.findOne({ _id: recId });
        const sender = await User.findOne({ _id: senderId });
        if (!receiver || !sender) {
            return res.status(404).send("One or more users not found!");
        }

        sender.friend_list.pull(recId);
        receiver.friend_list.pull(senderId);

        await receiver.save();
        await sender.save();

        res.status(200).send("Now you both are no longer friends!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;