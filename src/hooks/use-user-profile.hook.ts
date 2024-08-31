import { useEffect, useState } from "react";
import { EditUserProfile, UserProfileSchema } from "../schemas";
import { useAuth } from "../store";
import { supabase } from "../supabase/client";
import { useAuthUser } from "./use-auth-user.hook";

export const useUserProfile = () => {
  const { id } = useAuthUser();
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else if (data) {
        const parsedProfileData = UserProfileSchema.safeParse({
          id,
          ...data,
        });
        if (parsedProfileData.success) {
          setProfile(parsedProfileData.data);
        } else {
          //   throw new Error("Invalid profile data");
          console.error("Invalid profile data", parsedProfileData.error);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const updateProfile = async (profileUpdate: EditUserProfile) => {
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update(profileUpdate)
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      console.log("changing profile");
      setProfile({
        ...profileUpdate,
      });
    }

    setLoading(false);
  };

  return { profile, loading, updateProfile };
};
