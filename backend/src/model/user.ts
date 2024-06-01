import mongoose, {model} from "mongoose";
import userInterface from "src/interface/userInterface";

const schema = mongoose.Schema;

const userSchema = new schema<userInterface>( 
    {
    user : 
    {
        type: String,
        default: null,
        required:true,
    },
    email : 
    {
        type: String, 
        unique: true,
        lowercase: true,
        trim: true,
        required:true,
    },
    age : { 
        type: Number,
        default: null,
        required:true,
    },
    mobile : { 
        type: Number,
        default: null,
        required:true,
    },
    interest: {
        type: [String],
        default: []
    }
    },
    { 
      timestamps: true 
    },
)

export const userModel = model("users",userSchema);