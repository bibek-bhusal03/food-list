import { create } from "zustand";

const setSocketStore = create((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),

}));

export default setSocketStore;