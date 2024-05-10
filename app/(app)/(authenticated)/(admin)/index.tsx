import { View, Text, Button } from "react-native";

import { useUser } from "@/src/queries/useUser";

export default function Index() {
  const { signOut, data } = useUser();

  return (
    <View style={{ padding: 100 }}>
      <Text style={{ fontWeight: "800" }}>
        This is a protected route (ADMIN rol)
      </Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
      <Button onPress={() => signOut()} title="Sign Out" />
    </View>
  );
}
