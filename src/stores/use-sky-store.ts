import { create } from "zustand";

interface SkyStore {
	skyOffset: number;
	setSkyOffset: (offset: number) => void;
	skyIndex: number;
	setSkyIndex: (index: number) => void;
}

export const useSkyStore = create<SkyStore>((set) => ({
	skyOffset: 0,
	setSkyOffset: (skyOffset) => set({ skyOffset }),
	skyIndex: 0,
	setSkyIndex: (skyIndex) => set({ skyIndex }),
}));
