import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import GenericItemDetailsScreens from "../../screens/Menu/genericItem/itemDetails";
import GenericItemEdit from "../../screens/Menu/genericItem/itemEdit";
import GenericItemScreens from "../../screens/Menu/genericItem/itemScreens";

const Stack = createStackNavigator();

export default function GenericItemStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="GenericItemScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="GenericItemScreen" component={GenericItemScreens} options={{ title: "GenericScreen", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="GenericItemDetail"
        component={GenericItemDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Generic Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="GenericItemEdit"
        component={GenericItemEdit}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Generic",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
