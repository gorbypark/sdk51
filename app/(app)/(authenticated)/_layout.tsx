import { useUser, useRedirectByRol } from "@/src/queries/useUser";
import { Redirect, Slot } from "expo-router";
export default function AppLayout() {
  const { data } = useUser();

  // Redirects the user based on their rol.
  useRedirectByRol();

  // Redirects user if they are not logged in
  if (!data.isLoggedIn) {
    return <Redirect href="/(app)/signin" />;
  }

  return <Slot />;
}
