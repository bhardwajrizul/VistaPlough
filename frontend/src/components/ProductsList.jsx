import { motion } from "framer-motion";
import { Trash, Star, PencilIcon } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useState } from "react";
import UpdateProductForm from "./UpdateProductForm";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
	const [productState, setProductState] = useState({
		product: {},
		update: false,
	});
	console.log("products", products);

	const formatter = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	});

	if (productState.update) {
		return <UpdateProductForm productData={productState.product} setProductState={setProductState} />
	}

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead className='bg-gray-700'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 u-font-wasted uppercase tracking-wider'
							>
								Images
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 u-font-wasted uppercase tracking-wider'
							>
								Product
							</th>
							<th
								scope='col'
								className='u-font-wasted px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Price
							</th>
							<th
								scope='col'
								className='u-font-wasted px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Discount
							</th>
							<th
								scope='col'
								className='u-font-wasted px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Selling Price
							</th>
							<th
								scope='col'
								className='u-font-wasted px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Featured
							</th>
							<th
								scope='col'
								className='u-font-wasted px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='bg-gray-800 divide-y divide-gray-700'>
						{products?.map((product) => (
							<tr key={product._id} className='hover:bg-gray-700 h-28'>
								<td className='px-6 py-1 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex flex-row gap-2 h-full w-48 overflow-x-auto'>
											{product.images.map((image) => (
												<img
													key={image}
													className='w-24 rounded-[5px]'
													src={image}
													alt={`${product.name} image`}
												/>
											))}
										</div>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap u-font-wasted'>
									<div className='text-sm text-gray-300'>{product.name}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap u-font-wasted'>
									<div className='text-sm text-gray-300'>{formatter.format(product.price)}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm u-font-wasted text-gray-300'>{product.discount}%</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm u-font-wasted text-gray-300'>
										{formatter.format(product.price - (product.price * product.discount) / 100)}
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`p-1 rounded-full ${product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
											} hover:bg-yellow-500 transition-colors duration-200`}
									>
										<Star className='h-5 w-5' />
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
									<button
										onClick={() => deleteProduct(product._id)}
										className='text-red-400 hover:text-red-300 mr-4'
									>
										<Trash className='h-5 w-5 stroke-white' />
									</button>
									<button
										onClick={() => setProductState({ product: product, update: true })}
										className='text-red-400 hover:text-red-300'
									>
										<PencilIcon className='h-5 w-5 stroke-white' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default ProductsList;


