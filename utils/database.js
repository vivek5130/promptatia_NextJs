import mongoose from "mongoose";
// simply establishing connection to database
let isConnected = false;
export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("Database is already connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName : "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log("Mongo DB Connected")
    }
    catch(error){
        console.log(error)
    }

}