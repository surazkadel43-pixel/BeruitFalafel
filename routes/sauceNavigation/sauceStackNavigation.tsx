import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import SauceScreens from "../../screens/Menu/createSauceScreens/sauceScreens";

import SauceDetailsScreens from "../../screens/Menu/createSauceScreens/sauceDetails";
import SauceEdit from "../../screens/Menu/createSauceScreens/sauceEdit";

const Stack = createStackNavigator();

export default function SauceStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="SauceScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="SauceScreens" component={SauceScreens} options={{ title: "ItemScreen", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="SauceDetails"
        component={SauceDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Sauce Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="SauceEdit"
        component={SauceEdit}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Sauce",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
