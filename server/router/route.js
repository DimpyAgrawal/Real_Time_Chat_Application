const express = require('express');
const app = express();
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Authentication = require('../middleware/middleware')

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
74
        const match = await bcrypt.compare(password, exist.password);
        if (!match) {
            console.log("Password does not match");
            return res.status(400).send("Password does not match"); 
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



router.get('/alluser' , async(req,res)=>{
    let user = await User.find();
    res.send(user);
    console.log(user);
    // console.log("send");
})

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
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;