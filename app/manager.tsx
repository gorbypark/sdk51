import { View, Text } from "react-native";

import { useUserInfo } from "@/src/queries/useUser";

export default function Manager() {
  const data = useUserInfo();

  return (
    <View>
      <Text>Manager</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}
