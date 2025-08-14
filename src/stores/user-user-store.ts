import { supabase } from "@/db/client";
import { create } from "zustand";

type UserState = {
	id: string | null;
	email: string | null;
	username: string;
	loading: boolean;
	loadUser: () => Promise<string | null>;
	updateUsername: (newName: string) => Promise<boolean>;
	signOut: () => Promise<void>;
};

export const useUserStore = create<UserState>((set, get) => ({
	id: null,
	email: null,
	username: "",
	loading: true,

	loadUser: async () => {
		set({ loading: true });
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			set({ loading: false });
			return null;
		}

		// const { data: profile } = await supabase
		// 	.from("profiles")
		// 	.select("username")
		// 	.eq("id", user.id)
		// 	.single();

		set({
			id: user.id,
			email: user.email,
			username: "",
			loading: false,
		});
		return user.id;
	},

	updateUsername: async (newName: string) => {
		const { id } = get();
		if (!id) return false;

		const { error } = await supabase
			.from("profiles")
			.upsert({ id, username: newName });

		if (!error) {
			set({ username: newName });
			return true;
		}

		return false;
	},

	signOut: async () => {
		await supabase.auth.signOut();
		set({ id: null, email: null, username: "", loading: false });
	},
}));
