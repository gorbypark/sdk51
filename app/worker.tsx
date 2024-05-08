import { View, Text } from "react-native";

import { useUserInfo } from "@/src/queries/useUser";

export default function Worker() {
  const data = useUserInfo();

  return (
    <View>
      <Text>Worker</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}
