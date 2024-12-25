import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		discount: {
			type: Number,
			min: 0,
			default: 0,
			required: true,
		},
		images: [{
			type: String,
			required: [true, "At least one image is required"],
		}],
		stock: {
			type: Boolean,
			default: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
