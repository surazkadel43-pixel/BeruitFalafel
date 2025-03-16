import { createStackNavigator } from "@react-navigation/stack";
import React from "react";


import MeatScreens from "../../screens/Menu/meatScreens/meatScreens";
import MeatDetailsScreens from "../../screens/Menu/meatScreens/meatDetails";
import MeatEdit from "../../screens/Menu/meatScreens/meatEdit";


const Stack = createStackNavigator();

export default function MeatStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="MeatScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="MeatScreens" component={MeatScreens} options={{ title: "MeatScreen", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="MeatDetails"
        component={MeatDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Meat Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="MeatEdit"
        component={MeatEdit}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Meat",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
