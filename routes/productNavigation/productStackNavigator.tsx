import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ProductDetailsScreens from "../../screens/Menu/ProductScreens/productDetails";
import EditProduct from "../../screens/Menu/ProductScreens/productEdit";
import ProductScreens from "../../screens/Menu/ProductScreens/productScreens";
const Stack = createStackNavigator();

export default function ProductStackNavigator({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      initialRouteName="ProductScreens"
      screenOptions={{
        headerStyle: { backgroundColor: "#12193D" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Item Screen */}
      <Stack.Screen name="ProductScreens" component={ProductScreens} options={{ title: "Products", headerShown: false }} />

      {/* ItemDetail */}
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreens}
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
        name="ProductEdit"
        component={EditProduct}
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
