const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc Register the user 
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All the feilds are mandatory"); 
    }

    const userAvailable = await User.findOne({email});

    if (userAvailable) {
        res.status(400);
        throw new Error("Email address is already Registerd!!");
    }

    // hashpassword
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedpassword",hashedPassword);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    console.log(`user created ${user}`);

    if (user) {
        res.status(200).json({_id: user.id, email: user.email})
    }
    else { 
        res.status(400).json("User data is not valid");
    }
});

//@desc Login the user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req,res) => {

    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("All the fields are mandatory");
    }
    
    const user = await User.findOne({email});

    // compare password with hashed password

    // if not user throw error 

    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign({

            user: {
                email: user.email,
                id : user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "60m"});
        res.status(200).json({ accesstoken:accesstoken,userid: user.id });
    }
    else 
       throw new Error("Emai or Password is not Valid");
    
});


//@desc Current the user
//@route GET /api/user/current
//@access public
const currentUser = asyncHandler(async (req,res) => {
    res.json(req.user);
});


const checkEmail = asyncHandler(async(req,res) => {
    const email = req.params.email;

    console.log(email)

    if (!email) {
        res.status(400);
        throw new Error("All the feilds are mandatory");
    }

    const userAlready = await User.findOne({email});

    if (userAlready) {
        res.status(400);
        throw new Error("Email address is already taken!");
    }

    res.status(200).json("Good to go!");

    
});


module.exports = {registerUser, loginUser, currentUser, checkEmail};

