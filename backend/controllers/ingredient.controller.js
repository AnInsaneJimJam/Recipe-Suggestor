import Ingredient from "../models/ingredient.model";

export const getIngredients = async(req , res) => {
    try{
        const ingredients = await Ingredient.find({});
        res.status(200).json({ success: true, data: ingredients})
    }catch(error){
        console.error("error in Fetching Ingredients:", error.message);
        res.status(500).json({ success: false, message : "Server Error"})
    }
}

// Following routes for Admin control now , may turn to feature later

export const createIngredient = async(req,res) => {
    const ingredient = req.body;

    if(!ingredient.name || !ingredient.image ){
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }
    
    const newingredient = new ingredient(ingredient);

    try{
        await newingredient.save();
        res.status(200).json({success: true , data: newingredient});
    }catch(error){
        console.error("Error in Creating Ingredient:", error.message);
        res.status(500).json({ success: false , message: "Server Error"})
    }
}

export const deleteIngredient = async(req,res) => {
    const {id} = req.params;

    if(!Mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invlid Ingredient Id" });
    }

    try{
        await Ingredient.findIdAndDelete(id);
        res.status(200).json({ success : true, message: "Ingredient deleted"});
    }catch(error){
        console.error("Error in deleting Ingredient:", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateIngredient = async(req,res) => {
    const {id} = req.params;
    const ingredient = req.body;

    if(!Mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invlid Ingredient Id" });
    }
    // need to check if can be updated with less fields?
    try{
        await Ingredient.findByIdAndUpdate(id,ingredient, {new:true});
        res.status(200).json({success: true, data: ingredient})
    }catch(error){
        console.error("Error in updating ingredient", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}

