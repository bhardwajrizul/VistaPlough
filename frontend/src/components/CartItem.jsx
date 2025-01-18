import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	const formatter = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
	});
	const description = item.description.split(' ').slice(0, 10).join(' ');



	return (
		<div className='p-4 u-box-shadow u-border-accent u-bg-white rounded-[25px] md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 md:order-1'>
					<img className='w-[80%] md:w-full md:h-32 rounded-[15px] u-border-accent object-cover mx-auto' src={item.images[0]} />
				</div>



				<div className='w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md'>
					<p className='u-font-secondary u-font-sb text-2xl u-text-accent hover:underline'>
						{item.name}
					</p>
					{
						<p>
							{description}...
						</p>
					}
				</div>

				<label className='sr-only'>Choose quantity:</label>

				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-2'>
						<button
							className='inline-flex h-7 w-7 shrink-0 items-center justify-center 
u-border-accent u-bg-green hover:opacity-80 focus:outline-none focus:ring-2
focus:u-bg-accent rounded-[10px]'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='text-white stroke-white' />
						</button>
						<p className="u-font-wasted text-lg u-text-black">{item.quantity}</p>
						<button
							className='inline-flex h-7 w-7 shrink-0 items-center justify-center
u-border-accent u-bg-green hover:opacity-80 focus:outline-none 
focus:ring-2 focus:u-bg-accent rounded-[10px]'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='text-white stroke-white' />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32'>
						<p className='u-font-itangiuh font-bold u-text-black'>{
							formatter.format(item.price * item.quantity)
						}</p>
					</div>
				</div>

				<div className='flex items-center justify-end lg:justify-center gap-4 md:order-5'>
					<button
						className='inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline'
						onClick={() => removeFromCart(item._id)}
					>
						<Trash className="stroke-red-600" />
					</button>
				</div>

			</div>
		</div>
	);
};
export default CartItem;
