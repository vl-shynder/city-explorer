import { useAuth } from "../store";

export const useAuthUser = () => {
  const { user } = useAuth();

  if (!user) {
    throw new Error(
      "User is not authenticated. This hook should only be used in authenticated routes."
    );
  }

  return user;
};
