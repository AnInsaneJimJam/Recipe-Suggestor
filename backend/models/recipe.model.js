import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		ingredients: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Ingredient",
				required: true,
			},
		],
		procedure: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

//Made change to look for id then ref it in ingredients