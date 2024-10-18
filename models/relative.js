
import mongoose  from "mongoose";
const relativeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    

    relation: {
        type: String,
        enum:['fatherSide', 'motherSide'],
        required:true
    },
    
    address: {
        type: String,
        required: true
    },
     
    
    moneyGiven: {
        type: Number,
        default: 'no money'
    },
    likeability:{
type: String, 
enum: ['favourite','average','eyesore'], 
default:'average'


    }

    
});





const Relative = mongoose.model('relative', relativeSchema);
export default Relative