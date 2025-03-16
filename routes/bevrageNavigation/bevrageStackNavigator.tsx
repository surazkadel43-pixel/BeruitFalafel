import { createStackNavigator } from "@react-navigation/stack";
import React from "react";


import BevrageScreens from "../../screens/Menu/BevragesScreens/bevragesScreens";
import BevrageDetailsScreens from "../../screens/Menu/BevragesScreens/bevrageDetails";
import BevrageEdit from "../../screens/Menu/BevragesScreens/bevrageEdit";

const Stack = createStackNavigator();

export default function BevrageStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="BevrageScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="BevrageScreens" component={BevrageScreens} options={{ title: "Bevrage", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="BevrageDetails"
        component={BevrageDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Bevrage Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="BevrageEdit"
        component={BevrageEdit}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Bevrage Sauce",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
