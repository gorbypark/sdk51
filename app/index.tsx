import { View, PlatformColor } from "react-native";

import { SuperList } from "@/src/components/SuperList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: PlatformColor("systemBackground"),
      }}
    >
      <SuperList />
    </View>
  );
}
