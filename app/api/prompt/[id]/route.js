import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
// no persistent connection to the database, and a new connection must be established with each request. Hence connectToDB is needed to be called before calling api
// Get
export const GET = async (request, {params})=>{
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate("creator");
        if(!prompt) return new Response("Prompt not found",{status : 404});
        return new Response(JSON.stringify(prompt),{status: 200});

    }
    catch(error){
        return new Response("Internal Server Error",{status: 500});
    }
}

// patch
export const PATCH = async(request,{params})=>{
    const {prompt, tag} = await request.json();
    try{
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("Prompt not found", {status: 404});
        }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response("Successfully updated the Prompts" , {status: 200});
}
catch(error){
    return new Response("Error updating the prompt", {status: 500});
}
}


export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error deleting prompt" + error, { status: 500 });
    }
};