const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', async (req, res) => {
    const { name, email, pass } = req.body;
    if (!name || !email || !pass) {
        return res.status(400).json({ msg: "Please fill all the details", name, email, pass });
    }

    try {
        const pre_exist = await User.findOne({ email  });
        if (pre_exist) {
            return res.status(400).send("User already exists");
        }

        
        const hashedPassword = await bcrypt.hash(pass, 10);

       
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, 
        });

        return res.json({ msg: "Registered Successfully!" });
    } catch (error) {
        return res.status(500).json({ msg: "Error occurred while registering user", error });
    }
});


router.post('/login', async(req,res)=>{
    const { email, pass } = req.body;
    
    
    try {
        const exist = await User.findOne({ email });
        if (!exist) {
            console.log("user exist");
            return res.send("User does not exist");
        }
    
        const match = await bcrypt.compare(pass, exist.password);
        if (!match) {
            console.log("not matched")
            return res.send("Password not match!");
        }
       
    
        const token = jwt.sign({ email: exist.email, name: exist.name, pic: exist.pic }, process.env.JWT_SECRET);
        console.log("login")
        return res.send({
            msg: "Login Successfully",
            data: token
        });
    } catch (e) {
        console.error(e);
        return res.json({
            status: "error",
            msg: "Something went wrong."
        });
    }
    

})

module.exports = router;
