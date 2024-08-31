import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Spacer, YStack } from "tamagui";
import { UserCredentials, UserCredentialsSchema } from "../schemas";
import { useAuth } from "../store";
import { createAccount } from "../supabase";
import { Input } from "./input";

type AuthFormProps = {
  type: "sign-in" | "sign-up";
  onSuccess: () => void;
};

export const AuthForm: FC<AuthFormProps> = ({ type, onSuccess }) => {
  const { signIn } = useAuth();
  const form = useForm<UserCredentials>({
    resolver: zodResolver(UserCredentialsSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    if (type === "sign-in") {
      signIn(data).then((error) => {
        if (!error) {
          onSuccess();
        }
      });
    } else {
      createAccount(data).then(() => {
        onSuccess();
      });
    }
  });

  return (
    <>
      <YStack gap="$4">
        <Controller
          name="email"
          control={form.control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              placeholder="***********"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              error={error?.message}
            />
          )}
        />
      </YStack>
      <Spacer height="$5" />
      <YStack>
        <Button onPress={onSubmit}>Join</Button>
      </YStack>
    </>
  );
};
