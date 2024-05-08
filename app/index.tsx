import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";

import { useLogin, useUserInfo } from "@/src/queries/useUser";

export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate } = useLogin();
  const data = useUserInfo();

  const handleLogin = () => {
    mutate({ email, password });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <TextInput
        placeholder="email"
        placeholderTextColor="rgb(50,50,50)"
        onChangeText={(value) => setEmail(value)}
        style={{
          height: 50,
          borderColor: "blue",
          margin: 20,
          borderWidth: 1,
          paddingLeft: 10,
          color: "white",
        }}
      />
      <TextInput
        placeholder="password"
        placeholderTextColor="rgb(50,50,50)"
        onChangeText={(value) => setPassword(value)}
        style={{
          height: 50,
          borderColor: "blue",
          margin: 20,
          borderWidth: 1,
          paddingLeft: 10,
          color: "white",
        }}
      />
      <Button title="Sign In" onPress={() => handleLogin()} />
      <Text style={{ color: "white" }}>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}
