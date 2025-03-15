import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ItemDetailsScreens from "../../screens/Menu/itemScreens/itemDetails";
import ItemScreens from "../../screens/Menu/itemScreens/itemScreens";
import ItemEdit from "../../screens/Menu/itemScreens/itemEdit";


const Stack = createStackNavigator();

export default function ItemStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="ItemScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="ItemScreen" component={ItemScreens} options={{ title: "ItemScreen", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailsScreens}
        options={{
          
          presentation: "modal",
          headerShown: true,
          headerTitle: "Item Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="ItemEdit"
        component={ItemEdit}
        options={{
          
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Item",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
