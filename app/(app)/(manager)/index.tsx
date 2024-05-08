import { View, Text } from "react-native";

export default function Index() {
  return (
    <View style={{ padding: 100 }}>
      <Text style={{ fontWeight: "800" }}>
        This is a protected route (MANAGER rol)
      </Text>
    </View>
  );
}
