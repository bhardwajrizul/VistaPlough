import { BarChart, PlusCircle, ShoppingBasket, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import UsersInfoTab from "../components/Admin/UsersInfoTab";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
	{ id: "users", label: "Users", icon: UsersIcon }
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-16'>
				<motion.h1
					className='text-2xl mb-8 u-font-sarasvati u-text-accent text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				<div className='flex justify-center mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex u-font-wasted items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${activeTab === tab.id
									? "u-bg-accent text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
								}`}
						>
							<tab.icon className='mr-2 h-5 w-5 stroke-white' />
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList />}
				{activeTab === "analytics" && <AnalyticsTab />}
				{activeTab === "users" && <UsersInfoTab />}
			</div>
		</div>
	);
};
export default AdminPage;
