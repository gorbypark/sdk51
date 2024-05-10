import { View } from "react-native";
import { Link, Redirect } from "expo-router";
import { useUser } from "@/src/queries/useUser";

export default function Index() {
  const { data } = useUser();

  // This will return a null/blank page if the React Query restore from async/local storage hasn't completed yet
  // This will only be showns for a split second so i think a "blank" page is best but it could be a
  // activity indicator or whatnot but it will flash really quickly.
  if (data.isRestoringToken) {
    return null;
  }

  // If the user is logged in, redirect them to the authenticated section.  This could possibly live in the
  // _layout at this level, but it wouldn't allow an authorized user to go to sign in page if they wanted to.
  if (data.isLoggedIn) {
    return <Redirect href="/(app)/(authenticated)/" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Link href="/(app)/signin">Sign In</Link>
      <Link href="/(app)/(authenticated)/(worker)/">Protected route</Link>
    </View>
  );
}
