import { useUserInfo } from "@/src/queries/useUser";
import { Redirect, Slot } from "expo-router";
import { useRedirectByRol } from "@/src/queries/useUser";

export default function AppLayout() {
  const data = useUserInfo();

  // Redirects the user based on their rol.
  useRedirectByRol();

  // Redirects user if they are not logged in
  if (!data.isLoggedIn) {
    return <Redirect href="/signin" />;
  }

  return <Slot />;
}
