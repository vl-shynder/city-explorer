import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { UserCredentials } from "../schemas";
import { login, logout } from "../supabase";
import { supabase } from "../supabase/client";

type AuthState = {
  isSignedIn: boolean;
  user: User | null;

  signIn: (params: UserCredentials) => Promise<string | null>;
  signOut: () => Promise<void>;
  setAuthStateListener: () => void;
  unusbcribeAuthStateListener: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  isSignedIn: false,
  user: null,

  setAuthStateListener: () => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      set({ user: session?.user ?? null, isSignedIn: session !== null });
    });
    set({ unusbcribeAuthStateListener: data.subscription.unsubscribe });
  },

  unusbcribeAuthStateListener: () => {},

  signIn: (params) => login(params),
  signOut: () => logout(),
}));
