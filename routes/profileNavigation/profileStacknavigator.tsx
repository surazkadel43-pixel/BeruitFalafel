import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import NavigationHeader from "../../components/navigationHeader";
import EditName from "../../screens/profile/editName";
import EditPassword from "../../screens/profile/editPassword";
import EditPhoneNumber from "../../screens/profile/editPhoneNumber";
import ProfileScreens from "../../screens/profile/profilepage";

const Stack = createStackNavigator();

export default function ProfileStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="ProfileScreens"
        component={ProfileScreens}
        options={{ title: "Profile", headerShown: false,  }}
      />

      <Stack.Screen
        name="EditName"
        component={EditName}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Name",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />

      <Stack.Screen
        name="EditPassword"
        component={EditPassword}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Password",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />

      <Stack.Screen
        name="EditPhoneNumber"
        component={EditPhoneNumber}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Phone Number",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
