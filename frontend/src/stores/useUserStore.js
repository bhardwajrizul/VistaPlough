import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,
	userUpdated: false,

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/login", { email, password });

			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
	logout: async () => {
		set({ loading: true });
		try {
			await axios.post("/auth/logout");
			set({ user: null, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},
	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},
	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
	patchUserDetails: async ({ name, countryCode, phone }) => {
		set({ loading: true, userUpdated: false });

		if (!name.trim()
			|| !countryCode.trim()
			|| !phone.toString().trim()
			|| !/^\d{9,15}$/.test(phone.toString().trim())
		) {
			set((prevState) => {
				return { ...prevState, loading: false, userUpdated: true };
			});
			return toast.error("Please fill in all fields properly");
		}

		try {
			const res = await axios.patch("/auth/profile/updatedetails", { name, countryCode, phone });
			set({ user: res.data, loading: false, userUpdated: true });
			toast.success("Profile updated successfully");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},
	patchShippingDetails: async ({ landmark, address, city, state, pincode }) => {
		set({ loading: true, userUpdated: false });

		if (!address.trim()
			|| !city.trim()
			|| !state.trim()
			|| !pincode.toString().trim()
			|| !/^\d{6}$/.test(pincode.toString().trim())
		) {
			set((prevState) => {
				return { ...prevState, loading: false, userUpdated: true };
			});
			return toast.error("Invalid shipping details");
		}

		try {
			const res = await axios.patch("/auth/profile/updateshipping", { landmark, address, city, state, pincode });
			set({ user: res.data, loading: false, userUpdated: true });
			toast.success("Shipping details updated successfully");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	}
}));

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use((response) => response, async (error) => {
	const originalRequest = error.config;
	if (error.response?.status === 401 && !originalRequest._retry) {
		originalRequest._retry = true;

		try {
			// If a refresh is already in progress, wait for it to complete
			if (refreshPromise) {
				await refreshPromise;
				return axios(originalRequest);
			}

			// Start a new refresh process
			refreshPromise = useUserStore.getState().refreshToken();
			await refreshPromise;
			refreshPromise = null;

			return axios(originalRequest);
		} catch (refreshError) {
			// If refresh fails, redirect to login or handle as needed
			useUserStore.getState().logout();
			return Promise.reject(refreshError);
		}
	}
	return Promise.reject(error);
}
);
