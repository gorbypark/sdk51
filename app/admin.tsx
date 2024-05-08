import { View, Text } from "react-native";

import { useUserInfo } from "@/src/queries/useUser";

export default function Admin() {
  const data = useUserInfo();

  return (
    <View>
      <Text>Admin</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}
