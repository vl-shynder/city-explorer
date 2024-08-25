import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { config } from "../config";

export const supabase = createClient(
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
