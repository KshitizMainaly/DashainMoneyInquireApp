import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export const jwtAuthMidleware  = (req,res,next)=>{

    const authorization = req.headers['authorization'] 
 if(!authorization){
res.status(401).json({message:"token is empty"})


 }

const token = authorization.split(' ')[1]
if(!token){ 
res.status(401).json({message:"unauthorized access denied"})


}

//verify the token
try{
const decoded = jwt.verify(token,process.env.JWT_SECRET)
req.user = decoded
next()
}
catch(err){

  res.status(500).json({message:"invalid token"})  
}


}
// generate jwt token function

export const generateToken = (user)=>{

    return jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'12h'})
}



   
