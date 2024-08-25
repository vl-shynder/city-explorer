import { UserCredentials } from "../schemas";
import { supabase } from "./client";

// TODO: handle errors and display to user
export async function login({
  email,
  password,
}: UserCredentials): Promise<string | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("data", data);
  console.log("error", error);
  return error?.message ?? null;
}

export async function createAccount({ email, password }: UserCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log("data", data);
  console.log("error", error);
}
