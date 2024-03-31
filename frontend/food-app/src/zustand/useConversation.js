import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (new_message) =>
    set((state) => ({
      messages: [...state.messages, new_message],
    })),
}));


export default useConversation;
