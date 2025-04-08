import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import EditCateringSides from "../../screens/Menu/cateringSides/sidesEdit";
import CateringSidesDetailsScreens from "../../screens/Menu/cateringSides/sidesDetails";
import CateringSidesScreens from "../../screens/Menu/cateringSides/sidesScreens";

const Stack = createStackNavigator();

export default function CateringSidesStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="CateringSidesScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="CateringSidesScreens" component={CateringSidesScreens} options={{ title: "Catering Sides", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="CateringSidesDetails"
        component={CateringSidesDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Catering Sides Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="CateringSideEdit"
        component={EditCateringSides}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Catering Sides Edit",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
