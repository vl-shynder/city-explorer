import { Link } from "expo-router";
import { H4, Spacer, Text, View } from "tamagui";
import { AuthForm } from "../../../components";

export default function SignInScreen() {
  return (
    <View>
      <H4>Log into your account</H4>
      <Spacer height="$2" />
      <AuthForm
        type="sign-in"
        onSuccess={() => {
          console.log("user authorized");
        }}
      />
      <Text paddingTop="$2">
        Don't have an account yet?{" "}
        <Link href="/(onboarding)/(auth)/sign-up">Sign up</Link>
      </Text>
    </View>
  );
}
