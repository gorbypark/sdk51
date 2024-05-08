import { View, Text, Button } from "react-native";

import { useUserInfo, useSignOut } from "@/src/queries/useUser";

export default function Index() {
  const data = useUserInfo();
  const signOut = useSignOut();

  return (
    <View style={{ padding: 100 }}>
      <Text style={{ fontWeight: "800" }}>
        This is a protected route (WORKER rol)
      </Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
      <Button onPress={() => signOut()} title="Sign Out" />
    </View>
  );
}
