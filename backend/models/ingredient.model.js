import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;

//Done