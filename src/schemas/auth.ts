import { z } from "zod";

export const UserCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
export type UserCredentials = z.infer<typeof UserCredentialsSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const EditUserProfileSchema = z.object({
  first_name: z.string().min(2).max(20),
  last_name: z.string().min(2).max(20),
});
export type EditUserProfile = z.infer<typeof EditUserProfileSchema>;
