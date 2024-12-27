import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		discount: {
			type: Number,
			min: 0,
			max: 100,
			default: 0,
			required: true,
		},
		images: {
			type: [String], 
			validate: {
				validator: (arr) => arr.length > 0, // Validate at least one image
				message: "At least one image is required",
			},
		},
		stock: {
			type: Boolean,
			default: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		cloudinary_id: {
			type: String,
			validate: {
				validator: function () {
					return this.images && this.images.length > 0; 
				},
				message: "No folder name provided",
			},
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
