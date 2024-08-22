import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("event", event);
      console.log("session", session);
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return {
    user,
  };
};
