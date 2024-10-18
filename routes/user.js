//user routes

import express from 'express'
import {jwtAuthMidleware,generateToken} from '../jwt.js'
const router = express.Router()
import User from '../models/user.js'


router.get('/',async (req,res)=>{

    const users = await User.find()
res.json(users)


})

router.post('/signup',async (req,res)=>{
try{
const data = req.body


const existingUser = await User.findOne({name: data.name});
if (existingUser) {
    return res.status(400).json({ message: "User with this name already exists" });
}

const newUser = new User(data)

const savedUser = await newUser.save();
console.log("data save successfully")
const playload = {
id: savedUser.id

}

const token = generateToken(playload)
res.status(200).json({
    savedUser:savedUser,
    token:token
})


}

catch(err){

res.status(500).json({message:err})
}

})



router.post('/login',jwtAuthMidleware ,async (req,res)=>{
try{
const {name, password} = req.body
if(!name||!password){

res.status(400).json({message:"name or password is required"})

}

const user = await User.findOne({name:name})

if( !user || !(await user.comparePassword(password))){
    return res.status(401).json({error: 'Invalid Password'});
}

const playload = {
id: user.id


}

const token = generateToken(playload)
res.status(500).json({message: "user successfully logged in ",token: token})

}
catch(err){
res.status(400).json({message:err})


}

})





router.get('/profile', jwtAuthMidleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.put('/profile/password',jwtAuthMidleware , async (req, res) => {
    try {
        const userId = req.user.id; // Extract the id from the token
        const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

        // Check if currentPassword and newPassword are present in the request body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
        }

        // Find the user by userID
        const user = await User.findById(userId);

        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }
const oldPassword = user.password
        // Update the user's password
        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({ message: 'Password updated' ,oldPassword:oldPassword,updatedPassword:user.password});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




export default router