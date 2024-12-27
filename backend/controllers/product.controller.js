import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const getAllProducts = async (req, res) => {
	const { s } = req.query;
	const escapedSearchQuery = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	try {
		if (s.trim().length != 0) {
			const products = await Product.find({ name: { $regex: escapedSearchQuery, $options: "i" } });
			res.json({ products });
		} else {
			const products = await Product.find();
			res.json({ products });
		}
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, discount, stock, images } = req.body;
		const cloudinary_id = uuidv4();

		// Check if images are provided before using cloudinary api
		if (!images || images.length === 0) {
			return res.status(400).json({
				message: 'No images provided.',
				error: 'No images provided.',
			});
		}

		// Upload files to Cloudinary
		const uploadPromises = images.map((image, index) => {
			return new Promise((resolve, reject) => {
				// Remove Data URL prefix if present
				const base64Data = image.replace(/^data:.*;base64,/, '');

				const uploadStream = cloudinary.uploader.upload_stream(
					{
						folder: `products/`,
						public_id: `${cloudinary_id}_${index}}`,
					},
					(error, result) => {
						if (error) return reject(error);
						resolve(result.secure_url); // Resolve with secure_url
					}
				);

				// Convert cleaned Base64 to buffer and send it to Cloudinary
				const buffer = Buffer.from(base64Data, 'base64');
				uploadStream.end(buffer);
			});
		});

		const uploadedUrls = await Promise.all(uploadPromises);

		// Save product to database
		const product = await Product.create({
			name,
			description,
			price: parseFloat(price), // Ensure numeric value
			discount: discount ? parseFloat(discount) : 0,
			stock: stock,
			images: uploadedUrls,
			cloudinary_id: cloudinary_id,
		});

		res.status(201).json(product);
	} catch (error) {
		console.error('Error in createProduct controller:', error.message);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

export const putProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const { name, description, price, discount, stock, images, cloudinary_id } = req.body;
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({
				message: 'Product not found',
				error: 'Product not found',
			});
		}

		// Check if images are provided before using cloudinary api
		if (!images || images.length === 0) {
			return res.status(400).json({
				message: 'No images provided.',
				error: 'No images provided.',
			});
		}

		// If product does exist then delete the old images from cloudinary and upload new ones 
		// Get the id of new images and update the product and save it
		// After new images are uploaded, delete the old images from cloudinary

		const newCloudinary_id = uuidv4();

		const uploadPromises = images.map((image, index) => {
			return new Promise((resolve, reject) => {
				const base64Data = image.replace(/^data:.*;base64,/, '');
				const uploadStream = cloudinary.uploader.upload_stream(
					{
						folder: `products/`,
						public_id: `${newCloudinary_id}_${index}}`,
					},
					(error, result) => {
						if (error) return reject(error);
						resolve(result.secure_url);
					}
				);
				const buffer = Buffer.from(base64Data, 'base64');
				uploadStream.end(buffer);
			});
		});

		const uploadedUrls = await Promise.all(uploadPromises);

		// Delete old images from cloudinary
		await cloudinary.api.delete_resources_by_prefix(`products/${cloudinary_id}`);
		console.log("deleted image from cloduinary");

		// Update the product
		product.name = name;
		product.description = description;
		product.price = parseFloat(price);
		product.discount = discount ? discount : 0;
		product.stock = stock;
		product.images = uploadedUrls;
		product.cloudinary_id = newCloudinary_id;

		const updatedProduct = await product.save();
		res.status(200).json(updatedProduct);

	} catch (error) {
		console.error('Error in patchProduct controller:', error.message);
		res.status(500).json({ message: 'Error in Updaing Product', error: error.message });
	}

}

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.images.length > 0) {
			const cloudinary_id = product.cloudinary_id;
			try {
				await cloudinary.api.delete_resources_by_prefix(`products/${cloudinary_id}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsById = async (req, res) => {
	const { pid } = req.params;
	try {
		const product = await Product.findById(pid);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		console.log("Error in getProductsById controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}
