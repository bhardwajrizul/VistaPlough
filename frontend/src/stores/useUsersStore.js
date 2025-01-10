import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";


export const useUsersStore = create((set, get) => ({
    users: [],
    loading: false,
    page: 0,
    totalPages: 0,

    fetchUsers: async (searchQuery = "", page = 0) => {
        return null;
    }
}))