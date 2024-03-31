import { create } from "zustand";

const useLoggedInUser = create((set) => ({
  loggedInUser: null,
  setLoggedInUser: (user) => set({ loggedInUser: user }),
}));

export default useLoggedInUser;
