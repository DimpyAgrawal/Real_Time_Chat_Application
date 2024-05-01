const express = require('express');
const app = express();
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');
const Authentication = require('../middleware/middleware')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register',async (req,res)=>{
    const {email,password,confirm_pass}=req.body;
    if(!email || !password||!confirm_pass){
        return res.json({ error: "Fill complete details"});
    }
    // console.log(email+" "+password+" "+confirm_pass);
    if ((password!==confirm_pass)){
      return res.json({ error: "Password needs to match"});
    }
    // const encryptedPassword = await bcrypt.hash(password, 10);
    const generatedUserId=uuidv4()
    const hashedPassword=await bcrypt.hash(password, 10);
    try{
        const oldUser=await User.findOne({email});
        if (oldUser){
            return res.json({ error: "User Exists" });
        }
        const sanitizedEmail=email.toLowerCase();
        const newUser =new User({
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        });
        // console.log(newUser);
        await newUser.save();
        const token = jwt.sign({ email: sanitizedEmail, userId: generatedUserId }, process.env.JWT_SECRET, {
            expiresIn: 60 * 24
        });
        // console.log(email + " " +user_id);
        res.status(201).json({token, userId: generatedUserId})
    } 
    catch (error){
        console.log(error)
        // return res.status(500).json({ data: "Error occurred while registering user", error });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const exist = await User.findOne({email});
        // console.log(exist);
        if (!exist) {
            console.log("User does not exist");
            return res.send({error:"Please signup first:user not exist"});
        }

        const match = await bcrypt.compare(password, exist.hashed_password);
        if (!match) {
            // console.log({error:"Password does not match"});
            return res.send({error:"Wrong credentials"}); 
        }

        const token = jwt.sign({ email: exist.email, name: exist.name, pic: exist.pic ,id:exist._id}, process.env.JWT_SECRET);
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
    router.put('/user', async (req, res) => {
        const user_id = req.body.userId;
        try {
            const updatedUserData = req.body;
            // const exist = await User.findOne({user_id});
            // console.log(exist);
            // console.log(updatedUserData);
            const updatedUser = await User.updateOne({ user_id }, updatedUserData);
            res.json(updatedUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    });
    

router.put('/like/:id', async (req, res) => {
    try {
        const cardId = req.params.id;
        const userId = req.body.id;

        let card = await User.findById(cardId);
        const user = await User.findById(userId);

        if (!card || !user) {
            return res.status(404).json({ error: 'card not found' });
        }
        console.log(userId+" "+cardId)
        if (card.likedUser.includes(userId) && user.likedCard.includes(cardId) ) {

            console.log("user: "+ user);
            user.likedCard = user.likedCard.filter(id => id != cardId);
            await user.save();

            console.log("user: "+ user);
            console.log("card: "+ card);
            card = await User.findById(cardId);
            console.log("card: "+ card);

            card.likedUser = card.likedUser.filter(id => id != userId);
            await card.save();

            console.log("after saved: "+ card);
           
            return res.json({ msg: "dislike" });
        }
       

        card.likedUser.push(userId);
        user.likedCard.push(cardId);
        await card.save();
        await user.save();
        return res.status(200).json({ msg: "like" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/friend/:id', async (req, res) => {
    try {
        const cardId = req.params.id;
        const userId = req.body.id;

        let card = await User.findById(cardId);
        const user = await User.findById(userId);

        if (!card || !user) {
            return res.status(404).json({ error: 'card not found' });
        }
        console.log(userId+" "+cardId)
        if (card.friend.includes(userId) && user.friend.includes(cardId) ) {

            console.log("user: "+ user);
            user.friend = user.friend.filter(id => id != cardId);
            await user.save();

            console.log("user: "+ user);
            console.log("card: "+ card);
            card = await User.findById(cardId);
            console.log("card: "+ card);

            card.friend = card.friend.filter(id => id != userId);
            await card.save();

            console.log("after saved: "+ card);
           
            return res.json({ msg: "unfriend" });
        }
       

        card.friend.push(userId);
        user.friend.push(cardId);
        await card.save();
        await user.save();
        return res.status(200).json({ msg: "friend" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// to get a user
router.get("/", async (req, res) => {
    const { userId, userName } = req.query; // Use req.query to access query parameters instead of req.params
    try {
        const user = userId
            ? await User.findById(userId) // Use findById directly with userId
            : await User.findOne({ name: userName });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(400).json(error);
    }
});

// get all users data

router.get("/allUsers", async(req,res)=>{
    try{
        console.log('inside allusers backend');
        const users = await User.find();
        // console.log(users);
        //new changes
        res.status(200).json(users);

    }catch(error){
        res.status(400).json(error);
    }
});


module.exports = router;