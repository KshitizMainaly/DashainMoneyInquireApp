import express from 'express'
import {jwtAuthMidleware,generateToken} from '../jwt.js'
const router = express.Router()
import Relative from '../models/relative.js'


router.get('/',jwtAuthMidleware,async(req,res)=>{

    try{
const relatives = await Relative.find({userId:req.user.id})
if (!relatives || relatives.length === 0) {
    return res.status(404).json({ message: "No relatives found" });
}


res.status(200).json(relatives)

}
catch(err){
    console.err(err)
res.status(400).json(err)

}
})

router.post('/register',jwtAuthMidleware,async (req,res)=>{

    try{
        const data = req.body
        
        
        const existingRelative = await Relative.findOne({name: data.name});
        if (existingRelative) {
            return res.status(400).json({ message: "Relative with this name already exists" });
        }
        
        const newRelative = new Relative(
            {

                ...data,
                userId:req.user.id
            }
           
        )
        
        const savedRelative = await newRelative.save();
        console.log("data save successfully")

        res.status(200).json(savedRelative)
       }
        
      catch(err){
        console.error(err)
res.status(500).json({message:err})


      } 
       
        

        }
        



)



router.get('/result', jwtAuthMidleware, async (req, res) => {
    try {
        const relatives = await Relative.find({ userId: req.user.id }).sort({ moneyGiven: -1 }); // Sort by moneyGiven in descending order

        if (!relatives || relatives.length === 0) {
            return res.status(404).json({ message: "No relatives found" });
        }

        res.status(200).json(relatives);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});





export default router