import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ProductDetailsScreens from "../../screens/Menu/ProductScreens/productDetails";
import EditProduct from "../../screens/Menu/ProductScreens/productEdit";
import ProductScreens from "../../screens/Menu/ProductScreens/productScreens";

import CateringDetailsScreens from "../../screens/Menu/cateringProductScrrens/cateringDetails";
import CateringScreens from "../../screens/Menu/cateringProductScrrens/cateringScreens";
import EditCatering from "../../screens/Menu/cateringProductScrrens/editCatering";


const Stack = createStackNavigator();

export default function CateringStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="CateringScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="CateringScreens" component={CateringScreens} options={{ title: "Products", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="CateringDetails"
        component={CateringDetailsScreens}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Product Details",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
      {/* ItemDetail */}
      <Stack.Screen
        name="CateringEdit"
        component={EditCatering}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Product Edit",
          headerStyle: {
            backgroundColor: "#1C2237", // Change header background color
          },
          headerTintColor: "white", // Change header text color
        }}
      />
    </Stack.Navigator>
  );
}
