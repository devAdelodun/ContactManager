import ah from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const registerUser = ah(async(req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");

    }

    const userAvailable = await User.findOne({email})
    if(userAvailable) {
        res.status(400);
        throw new Error("User already exist")
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user =await User.create({
        username,
        email,
        password: hashedPassword,
    })

    if(user) {
        res.status(200).json({_id:user._id, emai: user.email})
    } else {
        res.status(400);
        throw new Error("User data are invalid")
    }
    res.json({ message: "Register the user" })
});


export const loginUser = ah(async(req, res) => {
    const {email, password} = req.body;
    if(!email|| !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({email})
 
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
               user: {
                username: user.username,
                email: user.email,
                id: user._id,
               },
            }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("Email or password incorrect")
    }
});

export const currentUser = ah(async(req, res) => {
    res.json(req.user)
})