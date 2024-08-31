import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, YStack } from "tamagui";
import {
  useBottomSafeAreaInsetsWithEnforcedSize,
  useUserProfile,
} from "../hooks";
import {
  EditUserProfile,
  EditUserProfileSchema,
  UserProfile,
} from "../schemas";
import { Input } from "./input";

type EditProfileFormProps = {
  profile: UserProfile;
};

export const EditProfileForm: FC<EditProfileFormProps> = ({ profile }) => {
  const { updateProfile } = useUserProfile();
  const router = useRouter();

  const bottom = useBottomSafeAreaInsetsWithEnforcedSize();
  const form = useForm<EditUserProfile>({
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data);
    router.back();
  });

  return (
    <YStack flex={1} paddingBottom={bottom}>
      <YStack flex={1}>
        <Controller
          name="first_name"
          control={form.control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              placeholder="John"
              value={value ?? undefined}
              onChangeText={onChange}
              autoCorrect={false}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="last_name"
          control={form.control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              placeholder="Doe"
              value={value ?? undefined}
              onChangeText={onChange}
              autoCorrect={false}
              error={error?.message}
            />
          )}
        />
      </YStack>
      <Button onPress={onSubmit}>Save</Button>
    </YStack>
  );
};
