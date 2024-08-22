import {
  Text,
  Input as TInput,
  InputProps as TInputProps,
  View,
} from "tamagui";

type InputProps = TInputProps & { error?: string };

export const Input = ({ error, ...props }: InputProps) => {
  return (
    <View>
      <TInput {...props} />
      {error && <Text color="$red10">{error}</Text>}
    </View>
  );
};
