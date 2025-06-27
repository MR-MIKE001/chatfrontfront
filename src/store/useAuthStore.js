import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const url = "http://localhost:5001";
export const useAuthStore = create((set, get) => {
  return {
    authUser: null,
    isSigningUp: false,
    isLogin: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onLineUsers: [],
    socket: null,
    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
        get().connectSocket();
      } catch (error) {
        console.log(error);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
    signup: async (data) => {
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data });
        toast.success("account created successfully");
        get().connectSocket();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isSigningUp: false });
      }
    },
    login: async (data) => {
      set({ isLogin: true });
      try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged in successfully");
        get().connectSocket();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isLogin: false });
      }
    },
    logout: async () => {
      try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        get().disConnectSocket();
        toast.success("logged out successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    updateProfile: async (data) => {
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.put("/auth/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isUpdatingProfile: false });
      }
    },
    connectSocket: async () => {
      const { authUser } = get();

      if (!authUser || get().socket?.connected) return;
      const socket = io(url, {
        query: {
          userid: authUser._id,
        },
      });
      socket.connect();

      set({ socket: socket });
      socket.on("getonlineusers", (users) => {
        set({ onLineUsers: users });
      });
    },
    disConnectSocket: () => {
      if (get().socket.connected) {
        get().socket.disconnect();
      }
    },
  };
});
