import {model, models, Schema} from 'mongoose';

// create schema and model for database
const UserSchema = new Schema({
    email:{
        type:  String,
        unique: [true, "Email already exits"],
        required : [true, "Email is required"]
    },
    username :{
        type : String,
        required : [true, "UserName is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image :{
        type: String
    }
})

// we are checking if User model is already present in models to ensure new model is created if not present or else reuse the existing ones  
// because in next js this route is called every time it is called/ connection establishes from scratch   
const User = models.User || model("User",UserSchema);
export default User;