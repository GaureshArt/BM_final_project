import { create } from "zustand";

interface AuthState {
  role: "client" | "freelancer" | null;
  userId: number;
  setRole: (role: "client" | "freelancer") => void;
  clearRole: () => void;
  setUserId: (id: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  userId: -1,
  setUserId: (id: number) => set({ userId: id }),
  setRole: (role) => set({ role: role }),
  clearRole: () => set({ role: null }),
}));
