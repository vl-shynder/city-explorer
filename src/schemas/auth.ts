import { z } from "zod";

export const UserCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
export type UserCredentials = z.infer<typeof UserCredentialsSchema>;
