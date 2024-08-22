import { Env } from "../types";

export const config: Env = {
  EXPO_PUBLIC_SUPABASE_KEY: process.env.EXPO_PUBLIC_SUPABASE_KEY || "",
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
};

function validateConfig(envConfig: Env) {
  Object.entries(envConfig).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });
}

validateConfig(config);
