import { createStackNavigator } from "@react-navigation/stack";
import React from "react";



import SidesDetailsScreens from "../../screens/Menu/SidesScreens/sidesDetails";
import SidesScreens from "../../screens/Menu/SidesScreens/sidesScreens";
import EditSides from "../../screens/Menu/SidesScreens/sidesEdit";

const Stack = createStackNavigator();

export default function SidesStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="SidesScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="SidesScreens" component={SidesScreens} options={{ title: "Sides", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="SidesDetails"
        component={SidesDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Sides Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="SidesEdit"
        component={EditSides}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Sides Edit",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
