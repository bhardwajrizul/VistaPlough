import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";

import NavbarContainer from "./components/NavbarContainer";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import General from "./components/Profile/General";
import Orders from "./components/Profile/Orders";

import { Toaster } from "react-hot-toast";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import Settings from "./components/Profile/Settings";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
		console.log("User was set");
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;
		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen u-grad w-lvw u-bg-secondary text-white relative u-border-layout overflow-hidden'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full' />
				</div>
			</div>
			<div className='relative z-50 pt-0 w-full '>
				{
					<NavbarContainer />
					
				}
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					<Route path='/products' element={<ProductsPage />} />
					<Route path='/products/:pid' element={<ProductPage />} />
					<Route path='/profile' element={user ? <ProfilePage /> : <Navigate to='/login' />}>
						<Route index element={user ? <General user={user} /> : <Navigate to='/login' />} />
						<Route path='orders' element={user ? <Orders /> : <Navigate to='/login' />} />
						<Route path='settings' element={user ? <Settings /> : <Navigate to='/login' />} />
					</Route>
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
				</Routes>
				<Footer />
			</div>
			<Toaster />
		</div>
	);
}

export default App;
