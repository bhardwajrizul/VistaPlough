import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Loader, ArrowLeft, CircleXIcon } from 'lucide-react';
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

const UpdateProductForm = ({ productData, setProductState }) => {
    const [product, setProduct] = useState({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        discount: productData.discount,
        stock: productData.stock,
        images: [],
        cloudinary_id: productData.cloudinary_id,
    });

    const { updateProduct, loading } = useProductStore();

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = await Promise.all(
                productData.images.map(async (url) => {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    const base64 = await convertToBase64(blob);
                    return {
                        id: Math.random().toString(36).slice(2, 10),
                        base64,
                        preview: url,
                    };
                })
            );
            setProduct(prev => ({ ...prev, images: loadedImages }));
        };
        loadImages();
    }, [productData.images]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            stock: product.stock,
            images: product.images.map((image) => image.base64),
            cloudinary_id: product.cloudinary_id,
        };

        try {
            await updateProduct(productData._id, updatedData);
            setProductState({ product: null, update: false });
        } catch (error) {
            console.error("Error updating product:", error);
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
        setProduct({ ...product, images: [...product.images, ...newImages] });
    };

    const removeImage = (id) => {
        setProduct({
            ...product,
            images: product.images.filter((image) => image.id !== id),
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = reorder(
            product.images,
            result.source.index,
            result.destination.index
        );

        setProduct({
            ...product,
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
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => setProductState({ product: null, update: false })}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Products
                </button>
                <h2 className="text-2xl u-text-accent u-font-sarasvati">Update Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-600 u-font-wasted">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
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
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
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
                        value={product.discount}
                        onChange={(e) => setProduct({ ...product, discount: e.target.value })}
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
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: e.target.value === 'true' })}
                        className="mt-1 block w-full u-bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 u-text-black focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-500 u-font-wasted"
                        required
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
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
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                className="flex flex-wrap gap-2 mt-2 min-h-[120px] p-2"
                            >
                                {product.images.map((image, index) => (
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
                                                        className="w-full h-full object-cover rounded-md"
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

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setProductState({ product: null, update: false })}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white u-bg-tertiary hover:u-bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-5 w-5" />
                                Update Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default UpdateProductForm;

