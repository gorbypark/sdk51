import { useUserInfo } from "@/src/queries/useUser";
import { Redirect, Slot } from "expo-router";
import { useRedirectByRol } from "@/src/queries/useUser";

export default function AppLayout() {
  const data = useUserInfo();

  useRedirectByRol();

  if (!data.token) {
    return <Redirect href="/signin" />;
  }

  return <Slot />;
}
