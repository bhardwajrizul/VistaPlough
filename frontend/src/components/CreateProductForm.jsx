
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, CircleXIcon } from 'lucide-react';
import { useProductStore } from "../stores/useProductStore";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { convertToBase64 } from "../lib/toBase64";

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	padding: 8,
	margin: '0 8px 0 0',
	background: isDragging ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
	borderRadius: '8px',
	...draggableStyle,
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
	display: 'flex',
	padding: 8,
	overflow: 'auto',
	borderRadius: '8px',
});

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		discount: "",
		stock: true,
		images: [],
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const productData = {
			name: newProduct.name,
			description: newProduct.description,
			price: newProduct.price,
			discount: newProduct.discount,
			stock: newProduct.stock,
			images: newProduct.images.map((image) => image.base64), // Use Base64 encoded images
		};

		try {
			await createProduct(productData);
			setNewProduct({ name: "", description: "", price: "", discount: "", stock: "", images: [] });
		} catch (error) {
			console.error("Error creating a product:", error);
		}
	};


	const handleImageChange = async (e) => {
		const files = Array.from(e.target.files);
		const newImages = await Promise.all(
			files.map(async (file) => {
				const base64 = await convertToBase64(file);
				return {
					id: Math.random().toString(36).slice(2, 10),
					base64, 
					preview: URL.createObjectURL(file),
				};
			})
		);
		setNewProduct({ ...newProduct, images: [...newProduct.images, ...newImages] });
	};


	const removeImage = (id) => {
		setNewProduct({
			...newProduct,
			images: newProduct.images.filter((image) => image.id !== id),
		});
	};

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const items = reorder(
			newProduct.images,
			result.source.index,
			result.destination.index
		);

		setNewProduct({
			...newProduct,
			images: items,
		});
	};

	return (
		<motion.div
			className="u-bg-white u-border-accent u-box-shadow rounded-[15px] p-8 mb-8 max-w-xl mx-auto"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className="text-2xl mb-6 u-text-accent u-font-sarasvati">Create New Product</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Form fields remain the same */}
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-slate-600 u-font-wasted">
						Product Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className="mt-1 block w-full u-bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 u-text-black focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-500 u-font-wasted"
						required
					/>
				</div>

				<div>
					<label htmlFor="description" className="block text-sm text-slate-600 u-font-wasted">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows="3"
						className="mt-1 block w-full u-bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 u-text-black focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-500 u-font-wasted"
						required
					/>
				</div>

				<div>
					<label htmlFor="price" className="block text-sm text-slate-600 u-font-wasted">
						Price
					</label>
					<input
						type="number"
						id="price"
						name="price"
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step="0.01"
						className="mt-1 block w-full u-bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 u-text-black focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-500 u-font-wasted"
						required
					/>
				</div>

				<div>
					<label htmlFor="discount" className="block text-sm text-slate-600 u-font-wasted">
						Discount
					</label>
					<input
						type="number"
						id="discount"
						name="discount"
						value={newProduct.discount}
						onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
						className="mt-1 block w-full u-bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 u-text-black focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-500 u-font-wasted"
						required
					/>
				</div>

				<div>
					<label htmlFor="stock" className="block text-sm text-slate-600 u-font-wasted">
						In Stock
					</label>
					<select
						id="stock"
						name="stock"
						value={newProduct.stock}
						onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
						className="mt-1 block w-full u-bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 u-text-black focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-500 u-font-wasted"
						required
					>
						<option value={true}>Yes</option>
						<option value={false}>No</option>
					</select>
				</div>

				<div className="mt-1 flex items-center">
					<input
						type="file"
						id="images"
						className="sr-only"
						accept="image/*"
						onChange={handleImageChange}
						multiple
					/>
					<label
						htmlFor="images"
						className="cursor-pointer u-bg-tertiary u-font-wasted py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
					>
						<Upload className="h-5 w-5 inline-block mr-2 stroke-white" />
						Upload Images
					</label>
				</div>

				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="droppableCreate" direction="horizontal">
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
								className="flex flex-wrap gap-2 mt-2 min-h-[120px] p-2"
							>
								{newProduct.images.map((image, index) => (
									<Draggable key={index} draggableId={`${index}`} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(
													snapshot.isDragging,
													provided.draggableProps.style
												)}
												className="relative"
											>
												<div className="relative w-[100px] h-[100px]">
													<img
														src={image.preview}
														alt={`Preview ${index + 1}`}
														className="object-cover rounded-md"
													/>
													<button
														type="button"
														onClick={() => removeImage(image.id)}
														className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
													>
														<CircleXIcon className="h-4 w-4" />
													</button>
												</div>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>

				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white u-bg-tertiary hover:u-bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50"
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className="mr-2 h-5 w-5" />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;

