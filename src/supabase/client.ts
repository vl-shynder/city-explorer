import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { config } from "../config";
import { Database } from "./supabase-types";

export const supabase = createClient<Database>(
  config.EXPO_PUBLIC_SUPABASE_URL,
  config.EXPO_PUBLIC_SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: AsyncStorage,
    },
  }
);
