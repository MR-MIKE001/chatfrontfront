import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChat = create((set, get) => {
  return {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    ListenToMessages: () => {
      const { selectedUser } = get();
      const socket = useAuthStore.getState().socket;

      if (!selectedUser) return;
      socket.on("newMessage", (newMessage) => {
        if (newMessage.senderID !== selectedUser._id) return;
        set((state) => ({ messages: [...state.messages, newMessage] }));
      });
    },

    OnListenToMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    },
    getUsers: async () => {
      set({ isUsersLoading: true });
      try {
        const res = await axiosInstance.get("/messages/users");
        set({ users: res.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isUsersLoading: false });
      }
    },
    getMessages: async (userID) => {
      set({ isMessagesLoading: true });
      try {
        const res = await axiosInstance.get(`messages/${userID}`);
        set({ messages: await res.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isMessagesLoading: false });
      }
    },
    sendMessage: async (messageData) => {
      const { selectedUser, messages } = get();
      console.log(selectedUser);
      try {
        const res = await axiosInstance.post(
          `/messages/send/${selectedUser._id}`,
          messageData,
        );
        set({ messages: [...messages, res.data] });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    setSelectedUser: async (selectedUser) => {
      set({ selectedUser: selectedUser });
    },
  };
});
